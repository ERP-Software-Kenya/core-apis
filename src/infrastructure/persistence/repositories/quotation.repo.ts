import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { BadRequestException, ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { EntityManager, In, Repository } from 'typeorm';
import { randomUUID } from 'crypto';
import { BaseRepo, countPages, DbException, Filter, IPageable, PageableFilter } from '../../../common';
import {
  CustomerEntity,
  LocationEntity,
  OrderEntity,
  OrderItemEntity,
  ProductEntity,
  ProductVariantEntity,
  QuotationEntity,
  QuotationItemEntity,
} from '../entities';
import { Quotation } from '../../../application/modules/quotations/domain';
import {
  ConvertQuotationRecord,
  CreateQuotationRecord,
  IQuotationRepo,
  QuotationFilter,
  UpdateQuotationRecord,
} from '../../../application/modules/quotations/i-quotation.repo';
import { EQuotationStatus } from '../../../application/shared/enums';
import { EOrderStatus } from '../../../application/shared/enums/e-order-status';

@Injectable()
export class QuotationRepo
  extends BaseRepo<QuotationEntity, Quotation, string, PageableFilter<QuotationFilter>, Filter<QuotationFilter>>
  implements IQuotationRepo
{
  constructor(
    @InjectRepository(QuotationEntity) internalRepo: Repository<QuotationEntity>,
    @InjectMapper() mapper: Mapper,
    @InjectPinoLogger(QuotationRepo.name) logger: PinoLogger,
  ) {
    super(internalRepo, mapper, logger, QuotationEntity, Quotation);
  }

  public override get idColumnName(): keyof QuotationEntity {
    return 'id';
  }

  public async getWithDetailsAsync(id: string): Promise<Quotation | null> {
    try {
      const entity = await this.internalRepo
        .createQueryBuilder('q')
        .leftJoinAndSelect('q.customer', 'c')
        .leftJoinAndSelect('q.location', 'loc')
        .leftJoinAndSelect('q.createdByUser', 'u')
        .leftJoinAndSelect('q.convertedOrder', 'o')
        .leftJoinAndSelect('q.items', 'qi')
        .leftJoinAndSelect('qi.product', 'p')
        .leftJoinAndSelect('qi.variant', 'pv')
        .where('q.id = :id', { id })
        .orderBy('qi.id', 'ASC')
        .getOne();

      if (!entity) return null;
      const model = this.mapToModel(entity);
      if (entity.customer) {
        model.customer = {
          id: entity.customer.id,
          name: entity.customer.name,
          phone: entity.customer.phone,
          email: entity.customer.email,
          address: entity.customer.address,
          gstin: entity.customer.gstin,
        };
      }
      if (entity.location) {
        model.location = {
          id: entity.location.id,
          name: entity.location.name,
          address: entity.location.address,
          phone: entity.location.phone,
        };
      }
      if (entity.createdByUser) {
        model.createdByUser = {
          id: entity.createdByUser.id,
          firstName: entity.createdByUser.firstName,
          lastName: entity.createdByUser.lastName,
          email: entity.createdByUser.email,
        };
      }
      return model;
    } catch (ex) {
      this.logger.error(ex);
      throw new DbException(ex);
    }
  }

  public async searchPagedAsync(filter: PageableFilter<QuotationFilter>): Promise<IPageable<Quotation>> {
    try {
      const page = filter.$page ?? 1;
      const perPage = filter.$perPage ?? 20;

      const qb = this.internalRepo
        .createQueryBuilder('q')
        .leftJoinAndSelect('q.customer', 'c')
        .leftJoinAndSelect('q.location', 'loc')
        .leftJoinAndSelect('q.createdByUser', 'u')
        .leftJoinAndSelect('q.items', 'qi');

      if (filter.organizationId) {
        qb.andWhere('q.organization_id = :orgId', { orgId: filter.organizationId });
      }

      if (filter.locationId) {
        qb.andWhere('q.location_id = :locId', { locId: filter.locationId });
      }

      if (filter.accessibleLocationIds !== undefined) {
        if (filter.accessibleLocationIds.length === 0) qb.andWhere('1 = 0');
        else qb.andWhere('q.location_id IN (:...accessibleLocationIds)', {
          accessibleLocationIds: filter.accessibleLocationIds,
        });
      }

      if (filter.customerId) {
        qb.andWhere('q.customer_id = :custId', { custId: filter.customerId });
      }

      if (filter.status) {
        qb.andWhere('q.status = :status', { status: filter.status });
      }

      if (filter.isLatest !== undefined) {
        qb.andWhere('q.is_latest = :isLatest', { isLatest: filter.isLatest });
      }

      if (filter.search?.trim()) {
        const q = `%${filter.search.trim()}%`;
        qb.andWhere('(q.quote_number ILIKE :q OR c.name ILIKE :q OR c.phone ILIKE :q)', { q });
      }

      qb.orderBy('q.createdAt', 'DESC');
      qb.skip((page - 1) * perPage).take(perPage);

      const [entities, totalCount] = await qb.getManyAndCount();

      const items = entities.map((entity) => {
        const model = this.mapToModel(entity);
        if (entity.customer) {
          model.customer = {
            id: entity.customer.id,
            name: entity.customer.name,
            phone: entity.customer.phone,
            email: entity.customer.email,
            address: entity.customer.address,
            gstin: entity.customer.gstin,
          };
        }
        if (entity.location) {
          model.location = {
            id: entity.location.id,
            name: entity.location.name,
            address: entity.location.address,
            phone: entity.location.phone,
          };
        }
        return model;
      });

      return {
        items,
        page,
        perPage,
        totalCount,
        totalPages: countPages(totalCount, perPage),
      };
    } catch (ex) {
      this.logger.error(ex);
      throw new DbException(ex);
    }
  }

  public async getRevisionsAsync(rootQuotationId: string): Promise<Quotation[]> {
    try {
      const entities = await this.internalRepo
        .createQueryBuilder('q')
        .where('q.root_quotation_id = :rootQuotationId', { rootQuotationId })
        .orderBy('q.version_number', 'ASC')
        .getMany();

      return entities.map((entity) => this.mapToModel(entity));
    } catch (ex) {
      this.logger.error(ex);
      throw new DbException(ex);
    }
  }

  public async createWithItemsAsync(input: CreateQuotationRecord): Promise<Quotation> {
    const id = await this.internalRepo.manager.transaction(async (manager) => {
      await this.assertReferencesBelongToOrganization(
        manager,
        input.organizationId,
        input.locationId,
        input.customerId,
        input.totals.items,
      );

      const now = new Date();
      const ym = `${now.getUTCFullYear()}${String(now.getUTCMonth() + 1).padStart(2, '0')}`;
      const quoteNumber = `QT-${ym}-${randomUUID().slice(0, 8).toUpperCase()}`;
      const quotation = manager.create(QuotationEntity, {
        quoteNumber,
        versionNumber: 1,
        rootQuotationId: randomUUID(),
        isLatest: true,
        status: EQuotationStatus.Draft,
        organizationId: input.organizationId,
        locationId: input.locationId,
        customerId: input.customerId,
        subtotal: input.totals.subtotal,
        taxAmount: input.totals.taxAmount,
        totalAmount: input.totals.totalAmount,
        notes: input.notes,
        createdByUserId: input.createdByUserId,
      });
      const saved = await manager.save(QuotationEntity, quotation);
      saved.rootQuotationId = saved.id;
      await manager.save(QuotationEntity, saved);
      await this.replaceItems(manager, saved.id, input.totals.items);
      return saved.id;
    });
    return this.requireDetails(id);
  }

  public async updateWithItemsAsync(input: UpdateQuotationRecord): Promise<Quotation> {
    await this.internalRepo.manager.transaction(async (manager) => {
      const quotation = await manager.createQueryBuilder(QuotationEntity, 'q')
        .setLock('pessimistic_write')
        .where('q.id = :id AND q.organization_id = :organizationId', input)
        .getOne();
      if (!quotation) throw new NotFoundException(`Quotation ${input.id} not found`);
      if (quotation.status !== EQuotationStatus.Draft) {
        throw new BadRequestException(
          `Cannot edit quotation in ${quotation.status} status. Only DRAFT quotations can be edited. Use 'revise' to create a new version.`,
        );
      }

      const locationId = input.locationId ?? quotation.locationId;
      const customerId = input.customerId ?? quotation.customerId;
      await this.assertReferencesBelongToOrganization(
        manager,
        input.organizationId,
        locationId,
        customerId,
        input.totals?.items,
      );
      quotation.locationId = locationId;
      quotation.customerId = customerId;
      if (input.notes !== undefined) quotation.notes = input.notes;
      if (input.totals) {
        quotation.subtotal = input.totals.subtotal;
        quotation.taxAmount = input.totals.taxAmount;
        quotation.totalAmount = input.totals.totalAmount;
        await this.replaceItems(manager, quotation.id, input.totals.items);
      }
      await manager.save(QuotationEntity, quotation);
    });
    return this.requireDetails(input.id);
  }

  public async reviseAsync(
    id: string,
    organizationId: string,
    createdByUserId?: string,
  ): Promise<Quotation> {
    const revisedId = await this.internalRepo.manager.transaction(async (manager) => {
      const original = await manager.createQueryBuilder(QuotationEntity, 'q')
        .setLock('pessimistic_write')
        .where('q.id = :id AND q.organization_id = :organizationId', { id, organizationId })
        .getOne();
      if (!original) throw new NotFoundException(`Quotation ${id} not found`);
      if (!original.isLatest || original.status === EQuotationStatus.Superseded) {
        throw new BadRequestException('Can only revise the latest version of a quotation');
      }
      if ([EQuotationStatus.Converted, EQuotationStatus.Cancelled].includes(original.status)) {
        throw new BadRequestException(`Cannot revise a ${original.status} quotation`);
      }

      const maxVersion = await manager.createQueryBuilder(QuotationEntity, 'q')
        .select('MAX(q.version_number)', 'value')
        .where('q.root_quotation_id = :rootId', { rootId: original.rootQuotationId })
        .getRawOne<{ value: string | null }>();
      const nextVersion = Number(maxVersion?.value ?? original.versionNumber) + 1;
      const baseNumber = original.quoteNumber.replace(/-v\d+$/, '');
      const originalItems = await manager.find(QuotationItemEntity, {
        where: { quotationId: original.id },
      });
      const saved = await manager.save(QuotationEntity, manager.create(QuotationEntity, {
        quoteNumber: `${baseNumber}-v${nextVersion}`,
        versionNumber: nextVersion,
        rootQuotationId: original.rootQuotationId,
        parentQuotationId: original.id,
        isLatest: true,
        status: EQuotationStatus.Draft,
        organizationId: original.organizationId,
        locationId: original.locationId,
        customerId: original.customerId,
        subtotal: original.subtotal,
        taxAmount: original.taxAmount,
        totalAmount: original.totalAmount,
        notes: original.notes,
        createdByUserId: createdByUserId ?? original.createdByUserId,
      }));
      await this.replaceItems(manager, saved.id, originalItems);
      original.status = EQuotationStatus.Superseded;
      original.isLatest = false;
      await manager.save(QuotationEntity, original);
      return saved.id;
    });
    return this.requireDetails(revisedId);
  }

  public async convertToOrderAsync(input: ConvertQuotationRecord): Promise<string> {
    return this.internalRepo.manager.transaction(async (manager) => {
      const quotation = await manager.createQueryBuilder(QuotationEntity, 'q')
        .setLock('pessimistic_write')
        .where('q.id = :id AND q.organization_id = :organizationId', input)
        .getOne();
      if (!quotation) throw new NotFoundException(`Quotation ${input.id} not found`);
      if (quotation.convertedOrderId) {
        throw new ConflictException(
          `Quotation ${quotation.quoteNumber} has already been converted to order ${quotation.convertedOrderId}`,
        );
      }
      if ([EQuotationStatus.Cancelled, EQuotationStatus.Superseded].includes(quotation.status)) {
        throw new BadRequestException(`Cannot convert a ${quotation.status} quotation`);
      }
      const quotationItems = await manager.find(QuotationItemEntity, {
        where: { quotationId: quotation.id },
      });
      if (!quotationItems.length) throw new BadRequestException('Quotation has no line items to convert');

      const fulfillmentLocationId = input.fulfillmentLocationId ?? quotation.locationId;
      const fulfillmentLocation = await manager.findOne(LocationEntity, {
        where: { id: fulfillmentLocationId, organizationId: input.organizationId },
      });
      if (!fulfillmentLocation) {
        throw new BadRequestException('Fulfillment location must belong to the quotation organization');
      }
      const order = await manager.save(OrderEntity, manager.create(OrderEntity, {
        orderNumber: `ORD-${Date.now()}-${randomUUID().slice(0, 8).toUpperCase()}`,
        locationId: quotation.locationId,
        customerId: quotation.customerId,
        status: EOrderStatus.Confirmed,
        subtotal: quotation.subtotal,
        taxAmount: quotation.taxAmount,
        totalAmount: quotation.totalAmount,
        paymentStatus: 'UNPAID',
        fulfillmentMode: input.fulfillmentMode,
        fulfillmentLocationId,
        sourceQuotationId: quotation.id,
      }));
      await manager.save(OrderItemEntity, quotationItems.map((item) => manager.create(OrderItemEntity, {
        orderId: order.id,
        productId: item.productId,
        variantId: item.variantId,
        quantity: item.quantity,
        unitPrice: item.unitTaxable,
        taxAmount: item.taxAmount,
        lineTotal: item.lineTotal,
      })));
      quotation.status = EQuotationStatus.Converted;
      quotation.convertedOrderId = order.id;
      await manager.save(QuotationEntity, quotation);
      return order.id;
    });
  }

  public async markSentIfDraftAsync(id: string, organizationId: string): Promise<Quotation> {
    await this.internalRepo.createQueryBuilder().update()
      .set({ status: EQuotationStatus.Sent })
      .where('id = :id AND organization_id = :organizationId AND status = :status', {
        id, organizationId, status: EQuotationStatus.Draft,
      })
      .execute();
    return this.requireDetails(id);
  }

  private async requireDetails(id: string): Promise<Quotation> {
    const quotation = await this.getWithDetailsAsync(id);
    if (!quotation) throw new NotFoundException(`Quotation ${id} not found`);
    return quotation;
  }

  private async replaceItems(
    manager: EntityManager,
    quotationId: string,
    items: Array<{
      productId: string;
      variantId?: string;
      quantity: number;
      unitPriceInclusive: number;
      unitTaxable: number;
      taxRate: number;
      taxAmount: number;
      lineTotal: number;
    }>,
  ): Promise<void> {
    await manager.delete(QuotationItemEntity, { quotationId });
    if (!items.length) return;
    await manager.save(QuotationItemEntity, items.map((item) => manager.create(QuotationItemEntity, {
      quotationId,
      ...item,
    })));
  }

  private async assertReferencesBelongToOrganization(
    manager: EntityManager,
    organizationId: string,
    locationId: string,
    customerId: string,
    items?: Array<{ productId: string; variantId?: string }>,
  ): Promise<void> {
    const [location, customer] = await Promise.all([
      manager.findOne(LocationEntity, { where: { id: locationId, organizationId } }),
      manager.findOne(CustomerEntity, { where: { id: customerId, organizationId } }),
    ]);
    if (!location) throw new BadRequestException('Location must belong to the quotation organization');
    if (!customer) throw new BadRequestException('Customer must belong to the quotation organization');
    if (!items?.length) return;

    const productIds = [...new Set(items.map((item) => item.productId))];
    const products = await manager.find(ProductEntity, { where: { id: In(productIds), organizationId } });
    if (products.length !== productIds.length) {
      throw new BadRequestException('Every quotation product must belong to the quotation organization');
    }
    const variantIds = [...new Set(items.flatMap((item) => item.variantId ? [item.variantId] : []))];
    if (!variantIds.length) return;
    const variants = await manager.find(ProductVariantEntity, { where: { id: In(variantIds) } });
    const expected = new Map(items.filter((item) => item.variantId).map((item) => [item.variantId, item.productId]));
    if (variants.length !== variantIds.length || variants.some((variant) => expected.get(variant.id) !== variant.productId)) {
      throw new BadRequestException('Every quotation variant must belong to its selected product');
    }
  }
}
