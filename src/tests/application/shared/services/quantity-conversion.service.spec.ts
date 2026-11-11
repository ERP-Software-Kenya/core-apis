jest.mock('@nestjs/typeorm', () => ({ InjectDataSource: () => () => undefined }));
jest.mock('typeorm', () => ({ DataSource: class {} }));
jest.mock('../../../../infrastructure/persistence/entities', () => ({
  OrganizationUnitEntity: class OrganizationUnitEntity {},
  ProductEntity: class ProductEntity {},
  ProductUnitEntity: class ProductUnitEntity {},
}));

import { BadRequestException } from '@nestjs/common';
import { QuantityConversionService } from '../../../../application/shared/services/quantity-conversion.service';
import { EUnitOperation } from '../../../../application/shared/enums/e-unit-operation';

function makeOrgUnit(overrides: Record<string, unknown> = {}) {
  return {
    id: 'unit-kg',
    name: 'Kilogram',
    symbol: 'KG',
    allowFraction: true,
    quantityPrecision: 4,
    minimumQuantity: null,
    quantityIncrement: '1',
    roundingMode: 'nearest',
    ...overrides,
  };
}

function makeProductUnit(overrides: Record<string, unknown> = {}) {
  return {
    id: 'pu-bag',
    unitId: 'unit-bag',
    productId: 'prod-1',
    organizationId: 'org-1',
    conversionFactor: '50',
    allowedForSale: true,
    allowedForPurchase: true,
    isActive: true,
    retiredAt: null,
    ...overrides,
  };
}

function makeProduct(overrides: Record<string, unknown> = {}) {
  return {
    id: 'prod-1',
    organizationId: 'org-1',
    baseUnitId: 'unit-kg',
    defaultSaleUnitId: 'unit-bag',
    defaultPurchaseUnitId: 'unit-bag',
    ...overrides,
  };
}

function makeService() {
  const productRepo = { findOne: jest.fn() };
  const productUnitRepo = { findOne: jest.fn() };
  const orgUnitRepo = { findOne: jest.fn() };

  const { ProductEntity, ProductUnitEntity, OrganizationUnitEntity } =
    jest.requireMock('../../../../infrastructure/persistence/entities');

  const dataSource = {
    getRepository: jest.fn((entity: unknown) => {
      if (entity === ProductEntity) return productRepo;
      if (entity === ProductUnitEntity) return productUnitRepo;
      if (entity === OrganizationUnitEntity) return orgUnitRepo;
      return { findOne: jest.fn() };
    }),
  };

  const service = new QuantityConversionService(dataSource as never);
  return { service, productRepo, productUnitRepo, orgUnitRepo };
}

describe('QuantityConversionService.convert', () => {
  it('converts bags to base KG (factor 50, enter 2 bags → 100 KG)', async () => {
    const { service, productRepo, productUnitRepo, orgUnitRepo } = makeService();

    productRepo.findOne.mockResolvedValue(makeProduct());
    productUnitRepo.findOne.mockResolvedValue(makeProductUnit());
    // first call → selected unit (Bag), second call → base unit (KG)
    orgUnitRepo.findOne
      .mockResolvedValueOnce(makeOrgUnit({ id: 'unit-bag', name: 'Bag', symbol: 'Bag' }))
      .mockResolvedValueOnce(makeOrgUnit());

    const result = await service.convert({
      organizationId: 'org-1',
      productId: 'prod-1',
      productUnitId: 'pu-bag',
      quantity: 2,
      operation: EUnitOperation.Stock,
    });

    expect(result.enteredQuantity).toBe('2');
    expect(result.conversionFactorSnapshot).toBe('50');
    expect(result.baseQuantity).toBe('100');
    expect(result.selectedUnitSymbolSnapshot).toBe('Bag');
    expect(result.baseUnitId).toBe('unit-kg');
  });

  it('passes through base-unit quantities unchanged (factor 1, enter 5)', async () => {
    const { service, productRepo, productUnitRepo, orgUnitRepo } = makeService();
    const baseUnit = makeProductUnit({ conversionFactor: '1', unitId: 'unit-kg', id: 'pu-kg' });

    productRepo.findOne.mockResolvedValue(makeProduct({ defaultSaleUnitId: 'unit-kg' }));
    productUnitRepo.findOne.mockResolvedValue(baseUnit);
    orgUnitRepo.findOne.mockResolvedValue(makeOrgUnit());

    const result = await service.convert({
      organizationId: 'org-1',
      productId: 'prod-1',
      productUnitId: 'pu-kg',
      quantity: 5,
      operation: EUnitOperation.Sale,
    });

    expect(result.baseQuantity).toBe('5');
  });

  it('throws when product is not found', async () => {
    const { service, productRepo } = makeService();
    productRepo.findOne.mockResolvedValue(null);

    await expect(
      service.convert({ organizationId: 'org-1', productId: 'prod-1', quantity: 1, operation: EUnitOperation.Stock }),
    ).rejects.toThrow('Product not found');
  });

  it('throws when product has no base unit configured', async () => {
    const { service, productRepo } = makeService();
    productRepo.findOne.mockResolvedValue(makeProduct({ baseUnitId: null }));

    await expect(
      service.convert({ organizationId: 'org-1', productId: 'prod-1', quantity: 1, operation: EUnitOperation.Stock }),
    ).rejects.toThrow('base inventory unit');
  });

  it('throws when unit is not allowed for sale', async () => {
    const { service, productRepo, productUnitRepo } = makeService();
    productRepo.findOne.mockResolvedValue(makeProduct());
    productUnitRepo.findOne.mockResolvedValue(makeProductUnit({ allowedForSale: false }));

    await expect(
      service.convert({
        organizationId: 'org-1', productId: 'prod-1', productUnitId: 'pu-bag',
        quantity: 1, operation: EUnitOperation.Sale,
      }),
    ).rejects.toThrow('not allowed for sale');
  });

  it('throws when unit is not allowed for purchase', async () => {
    const { service, productRepo, productUnitRepo } = makeService();
    productRepo.findOne.mockResolvedValue(makeProduct());
    productUnitRepo.findOne.mockResolvedValue(makeProductUnit({ allowedForPurchase: false }));

    await expect(
      service.convert({
        organizationId: 'org-1', productId: 'prod-1', productUnitId: 'pu-bag',
        quantity: 1, operation: EUnitOperation.Purchase,
      }),
    ).rejects.toThrow('not allowed for purchase');
  });

  it('allows any active unit for Stock operation regardless of sale/purchase flags', async () => {
    const { service, productRepo, productUnitRepo, orgUnitRepo } = makeService();
    productRepo.findOne.mockResolvedValue(makeProduct());
    productUnitRepo.findOne.mockResolvedValue(
      makeProductUnit({ allowedForSale: false, allowedForPurchase: false }),
    );
    orgUnitRepo.findOne
      .mockResolvedValueOnce(makeOrgUnit({ id: 'unit-bag', name: 'Bag', symbol: 'Bag' }))
      .mockResolvedValueOnce(makeOrgUnit());

    const result = await service.convert({
      organizationId: 'org-1', productId: 'prod-1', productUnitId: 'pu-bag',
      quantity: 1, operation: EUnitOperation.Stock,
    });

    expect(result.baseQuantity).toBe('50');
  });

  it('throws when unit does not allow fractions and a decimal is entered', async () => {
    const { service, productRepo, productUnitRepo, orgUnitRepo } = makeService();
    productRepo.findOne.mockResolvedValue(makeProduct());
    productUnitRepo.findOne.mockResolvedValue(makeProductUnit());
    orgUnitRepo.findOne.mockResolvedValue(makeOrgUnit({ allowFraction: false, symbol: 'Bag' }));

    await expect(
      service.convert({
        organizationId: 'org-1', productId: 'prod-1', productUnitId: 'pu-bag',
        quantity: '1.5', operation: EUnitOperation.Stock,
      }),
    ).rejects.toThrow(BadRequestException);
  });

  it('throws when below the unit minimum quantity', async () => {
    const { service, productRepo, productUnitRepo, orgUnitRepo } = makeService();
    productRepo.findOne.mockResolvedValue(makeProduct());
    productUnitRepo.findOne.mockResolvedValue(makeProductUnit());
    orgUnitRepo.findOne.mockResolvedValue(makeOrgUnit({ minimumQuantity: '5', symbol: 'Bag' }));

    await expect(
      service.convert({
        organizationId: 'org-1', productId: 'prod-1', productUnitId: 'pu-bag',
        quantity: 2, operation: EUnitOperation.Stock,
      }),
    ).rejects.toThrow('at least');
  });
});

describe('QuantityConversionService.convertComponents', () => {
  it('sums multiple components into base quantity', async () => {
    const { service, productRepo, productUnitRepo, orgUnitRepo } = makeService();
    const { ProductUnitEntity } = jest.requireMock('../../../../infrastructure/persistence/entities');

    productRepo.findOne.mockResolvedValue(makeProduct());
    // Both components resolve the same unit config for simplicity
    productUnitRepo.findOne.mockResolvedValue(makeProductUnit({ conversionFactor: '1', unitId: 'unit-kg', id: 'pu-kg' }));
    orgUnitRepo.findOne.mockResolvedValue(makeOrgUnit());

    const result = await service.convertComponents({
      organizationId: 'org-1',
      productId: 'prod-1',
      components: [
        { productUnitId: 'pu-kg', quantity: 30 },
        { productUnitId: 'pu-kg', quantity: 20 },
      ],
      operation: EUnitOperation.Stock,
    });

    expect(result.baseQuantity).toBe('50');
    expect(result.components).toHaveLength(2);
  });

  it('throws when no components are provided', async () => {
    const { service } = makeService();

    await expect(
      service.convertComponents({
        organizationId: 'org-1', productId: 'prod-1',
        components: [], operation: EUnitOperation.Stock,
      }),
    ).rejects.toThrow('At least one');
  });
});
