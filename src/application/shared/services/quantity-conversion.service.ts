import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { OrganizationUnitEntity, ProductEntity, ProductUnitEntity } from '../../../infrastructure/persistence/entities';
import { EUnitOperation } from '../enums/e-unit-operation';
import { fromScaledQuantity, QUANTITY_SCALE, toScaledQuantity } from '../helpers/quantity-decimal';

export interface QuantityConversionResult {
  productUnitId: string;
  selectedUnitId: string;
  selectedUnitNameSnapshot: string;
  selectedUnitSymbolSnapshot: string;
  enteredQuantity: string;
  conversionFactorSnapshot: string;
  baseUnitId: string;
  baseQuantity: string;
}

@Injectable()
export class QuantityConversionService {
  public constructor(@InjectDataSource() private readonly dataSource: DataSource) {}

  public async convert(input: {
    organizationId: string;
    productId: string;
    productUnitId?: string;
    quantity: string | number;
    operation: EUnitOperation;
  }): Promise<QuantityConversionResult> {
    const product = await this.dataSource.getRepository(ProductEntity).findOne({
      where: { id: input.productId, organizationId: input.organizationId },
    });
    if (!product) throw new NotFoundException('Product not found');
    if (!product.baseUnitId) throw new BadRequestException('Product does not have a base inventory unit configured');

    const productUnit = await this.resolveProductUnit(product, input.productUnitId, input.operation);
    const unit = await this.dataSource.getRepository(OrganizationUnitEntity).findOne({
      where: { id: productUnit.unitId, organizationId: input.organizationId },
    });
    if (!unit) throw new BadRequestException('Selected unit is not available for this organization');
    const baseUnit = await this.dataSource.getRepository(OrganizationUnitEntity).findOne({
      where: { id: product.baseUnitId, organizationId: input.organizationId },
    });
    if (!baseUnit) throw new BadRequestException('Product base unit is not available for this organization');

    const entered = toScaledQuantity(input.quantity, 'Quantity');
    if (entered <= 0n) throw new BadRequestException('Quantity must be greater than 0');
    this.validateUnitQuantity(entered, unit);

    const factor = toScaledQuantity(productUnit.conversionFactor, 'Conversion factor');
    const numerator = entered * factor;
    let baseScaled = numerator / QUANTITY_SCALE;
    const conversionRemainder = numerator % QUANTITY_SCALE;
    if (conversionRemainder > 0n) {
      baseScaled = this.roundScaled(baseScaled, 1n, baseUnit.roundingMode, conversionRemainder, QUANTITY_SCALE);
    }
    const precisionStep = 10n ** BigInt(8 - baseUnit.quantityPrecision);
    const incrementStep = toScaledQuantity(baseUnit.quantityIncrement, 'Base quantity increment');
    baseScaled = this.roundScaled(baseScaled, precisionStep > incrementStep ? precisionStep : incrementStep, baseUnit.roundingMode);
    if (baseScaled <= 0n) throw new BadRequestException('Converted base quantity must be greater than 0');

    return {
      productUnitId: productUnit.id,
      selectedUnitId: unit.id,
      selectedUnitNameSnapshot: unit.name,
      selectedUnitSymbolSnapshot: unit.symbol,
      enteredQuantity: fromScaledQuantity(entered),
      conversionFactorSnapshot: fromScaledQuantity(factor),
      baseUnitId: product.baseUnitId,
      baseQuantity: fromScaledQuantity(baseScaled),
    };
  }

  public async convertComponents(input: {
    organizationId: string;
    productId: string;
    components: Array<{ productUnitId: string; quantity: string | number }>;
    operation: EUnitOperation;
  }): Promise<{ baseQuantity: string; components: QuantityConversionResult[] }> {
    if (!input.components.length) throw new BadRequestException('At least one quantity component is required');
    const components = await Promise.all(input.components.map((component) => this.convert({
      organizationId: input.organizationId,
      productId: input.productId,
      productUnitId: component.productUnitId,
      quantity: component.quantity,
      operation: input.operation,
    })));
    const baseQuantity = components.reduce((sum, component) => sum + toScaledQuantity(component.baseQuantity, 'Base quantity'), 0n);
    return { baseQuantity: fromScaledQuantity(baseQuantity), components };
  }

  private async resolveProductUnit(product: ProductEntity, requestedId: string | undefined, operation: EUnitOperation): Promise<ProductUnitEntity> {
    const id = requestedId ?? await this.defaultProductUnitId(product, operation);
    if (!id) throw new BadRequestException('Product does not have a unit configured for this operation');
    const productUnit = await this.dataSource.getRepository(ProductUnitEntity).findOne({
      where: { id, productId: product.id, organizationId: product.organizationId, isActive: true },
    });
    if (!productUnit || productUnit.retiredAt) throw new BadRequestException('Selected product unit is inactive or invalid');
    if (operation === EUnitOperation.Sale && !productUnit.allowedForSale) {
      throw new BadRequestException('Selected unit is not allowed for sale');
    }
    if (operation === EUnitOperation.Purchase && !productUnit.allowedForPurchase) {
      throw new BadRequestException('Selected unit is not allowed for purchase');
    }
    return productUnit;
  }

  private defaultProductUnitId(product: ProductEntity, operation: EUnitOperation): Promise<string | undefined> {
    const unitId = operation === EUnitOperation.Sale
      ? product.defaultSaleUnitId
      : operation === EUnitOperation.Purchase
        ? product.defaultPurchaseUnitId
        : product.baseUnitId;
    if (!unitId) return Promise.resolve(undefined);
    return this.dataSource.getRepository(ProductUnitEntity).findOne({
      where: { productId: product.id, unitId, isActive: true },
    }).then((value) => value?.id);
  }

  private validateUnitQuantity(quantity: bigint, unit: OrganizationUnitEntity): void {
    if (!unit.allowFraction && quantity % QUANTITY_SCALE !== 0n) throw new BadRequestException(`${unit.name} only allows whole quantities`);
    const precisionScale = 10n ** BigInt(8 - unit.quantityPrecision);
    if (quantity % precisionScale !== 0n) throw new BadRequestException(`${unit.name} allows at most ${unit.quantityPrecision} decimal places`);
    if (unit.minimumQuantity != null && quantity < toScaledQuantity(unit.minimumQuantity, 'Minimum quantity')) {
      throw new BadRequestException(`Quantity must be at least ${unit.minimumQuantity} ${unit.symbol}`);
    }
    const increment = toScaledQuantity(unit.quantityIncrement, 'Quantity increment');
    if (increment > 0n && quantity % increment !== 0n) {
      throw new BadRequestException(`Quantity must be entered in increments of ${unit.quantityIncrement} ${unit.symbol}`);
    }
  }

  private roundScaled(value: bigint, step: bigint, mode: string, extraRemainder = 0n, extraDivisor = 1n): bigint {
    if (step <= 1n && extraRemainder === 0n) return value;
    const remainder = value % step;
    const floor = value - remainder;
    const hasFraction = remainder > 0n || extraRemainder > 0n;
    if (!hasFraction || mode === 'down') return floor;
    if (mode === 'up') return floor + step;
    const twiceRemainder = remainder * 2n * extraDivisor + extraRemainder * 2n;
    return twiceRemainder >= step * extraDivisor ? floor + step : floor;
  }
}
