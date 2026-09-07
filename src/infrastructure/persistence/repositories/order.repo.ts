import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { IsNull, In, Repository } from 'typeorm';
import { BaseRepo, countPages, DbException, Filter, IPageable, PageableFilter } from '../../../common';
import { CustomerEntity, OrderEntity, UserEntity } from '../entities';
import { Order } from '../../../application/modules/orders/domain';
import { IOrderRepo, OrderFilter, PackedOrderRow } from '../../../application/modules/orders/i-order.repo';
import { EOrderStatus } from '../../../application/shared/enums/e-order-status';
import { EFulfillmentMode } from '../../../application/shared/enums/e-fulfillment-mode';
import {
  OrderAlreadyClaimedException,
  OrderNotFoundException,
  OrderNotReadyForPickupException,
} from '../../../application/modules/order-operations/exceptions';

@Injectable()
export class OrderRepo
  extends BaseRepo<OrderEntity, Order, string, PageableFilter<OrderFilter>, Filter<OrderFilter>>
  implements IOrderRepo
{
  constructor(
    @InjectRepository(OrderEntity) internalRepo: Repository<OrderEntity>,
    @InjectMapper() mapper: Mapper,
    @InjectPinoLogger(OrderRepo.name) logger: PinoLogger,
  ) {
    super(internalRepo, mapper, logger, OrderEntity, Order);
  }

  public override get idColumnName(): keyof OrderEntity {
    return 'id';
  }

  public async claimAsync(orderId: string, pickerUserId: string): Promise<Order> {
    try {
      const result = await this.internalRepo
        .createQueryBuilder()
        .update()
        .set({ claimedByUserId: pickerUserId, claimedAt: new Date() })
        .where(
          'id = :orderId AND status = :status AND claimed_by_user_id IS NULL',
          { orderId, status: EOrderStatus.Confirmed },
        )
        .execute();

      if (result.affected === 0) {
        throw new OrderAlreadyClaimedException();
      }

      const entity = await this.internalRepo.findOneOrFail({ where: { id: orderId } });
      return this.mapToModel(entity);
    } catch (ex) {
      if (ex instanceof OrderAlreadyClaimedException) throw ex;
      this.logger.error(ex);
      throw new DbException(ex);
    }
  }

  public async findQueueAsync(locationId: string): Promise<Order[]> {
    try {
      const entities = await this.internalRepo.find({
        where: {
          fulfillmentLocationId: locationId,
          status: EOrderStatus.Confirmed,
          claimedByUserId: IsNull(),
        },
        order: { createdAt: 'ASC' },
      });
      return this.mapToModelArray(entities);
    } catch (ex) {
      this.logger.error(ex);
      throw new DbException(ex);
    }
  }

  public async getWithItemsAsync(id: string): Promise<Order | null> {
    try {
      const entity = await this.internalRepo.findOne({ where: { id }, relations: ['items'] });
      if (!entity) return null;
      return this.mapToModel(entity);
    } catch (ex) {
      this.logger.error(ex);
      throw new DbException(ex);
    }
  }

  public async markPickedUpAsync(orderId: string, _userId: string): Promise<Order> {
    try {
      const entity = await this.internalRepo.findOne({ where: { id: orderId } });
      if (!entity) throw new OrderNotFoundException();
      if (entity.status !== EOrderStatus.Packed) {
        throw new OrderNotReadyForPickupException('Order must be packed before customer collection');
      }
      if (entity.fulfillmentMode !== EFulfillmentMode.Pickup) {
        throw new OrderNotReadyForPickupException('Only pickup orders can be marked as collected');
      }
      entity.status = EOrderStatus.Delivered;
      const saved = await this.internalRepo.save(entity);
      return this.mapToModel(saved);
    } catch (ex) {
      if (ex instanceof OrderNotFoundException || ex instanceof OrderNotReadyForPickupException) throw ex;
      this.logger.error(ex);
      throw new DbException(ex);
    }
  }

  public async searchPagedAsync(filter: PageableFilter<OrderFilter>): Promise<IPageable<Order>> {
    try {
      const page = filter.$page ?? 1;
      const perPage = filter.$perPage ?? 20;
      const qb = this.internalRepo
        .createQueryBuilder('o')
        .innerJoin('o.location', 'loc')
        .leftJoin(CustomerEntity, 'c', 'c.id = o.customer_id')
        .where('loc.organization_id = :orgId', { orgId: filter.organizationId });

      if (filter.status) {
        qb.andWhere('o.status = :status', { status: filter.status });
      }
      if (filter.fulfillmentMode) {
        qb.andWhere('o.fulfillment_mode = :fulfillmentMode', { fulfillmentMode: filter.fulfillmentMode });
      }
      if (filter.search?.trim()) {
        const q = `%${filter.search.trim()}%`;
        qb.andWhere('(o.order_number ILIKE :q OR c.name ILIKE :q)', { q });
      }

      qb.orderBy('o.created_at', 'DESC');
      qb.skip((page - 1) * perPage).take(perPage);

      const [entities, totalCount] = await qb.getManyAndCount();
      return {
        items: this.mapToModelArray(entities),
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

  public async findPackedForDispatchPagedAsync(
    filter: PageableFilter<OrderFilter>,
  ): Promise<IPageable<PackedOrderRow>> {
    try {
      const page = filter.$page ?? 1;
      const perPage = filter.$perPage ?? 20;
      const qb = this.internalRepo
        .createQueryBuilder('o')
        .innerJoinAndSelect('o.location', 'loc')
        .innerJoinAndSelect('o.customer', 'c')
        .leftJoinAndSelect('o.items', 'oi')
        .where('o.status = :status', { status: EOrderStatus.Packed })
        .andWhere('o.fulfillment_mode = :mode', { mode: EFulfillmentMode.Delivery })
        .andWhere('loc.organization_id = :orgId', { orgId: filter.organizationId })
        .andWhere(`NOT EXISTS (SELECT 1 FROM core.trip_stops ts WHERE ts.order_id = o.id)`);

      if (filter.search?.trim()) {
        const q = `%${filter.search.trim()}%`;
        qb.andWhere('(o.order_number ILIKE :q OR c.name ILIKE :q)', { q });
      }

      qb.orderBy('o.packedAt', 'ASC');
      qb.skip((page - 1) * perPage).take(perPage);

      const [entities, totalCount] = await qb.getManyAndCount();
      const pickerIds = [...new Set(entities.map((e) => e.packedByUserId).filter(Boolean))] as string[];
      const pickers = pickerIds.length
        ? await this.internalRepo.manager.getRepository(UserEntity).findBy({ id: In(pickerIds) })
        : [];
      const pickerNameById = new Map(
        pickers.map((u) => [u.id, `${u.firstName ?? ''} ${u.lastName ?? ''}`.trim()]),
      );

      const items: PackedOrderRow[] = entities.map((entity) => ({
        id: entity.id,
        orderNumber: entity.orderNumber,
        customerId: entity.customerId,
        customerName: entity.customer?.name ?? '',
        deliveryAddress: entity.customer?.address ?? '',
        pickerName: entity.packedByUserId ? (pickerNameById.get(entity.packedByUserId) ?? '') : '',
        packedAt: entity.packedAt!,
        itemCount: entity.items?.length ?? 0,
        locationId: entity.fulfillmentLocationId ?? entity.locationId,
        organizationId: entity.location?.organizationId ?? '',
      }));

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

  public async findReadyForPickupPagedAsync(
    filter: PageableFilter<OrderFilter & { locationId?: string }>,
  ): Promise<IPageable<PackedOrderRow>> {
    try {
      const page = filter.$page ?? 1;
      const perPage = filter.$perPage ?? 20;
      const qb = this.internalRepo
        .createQueryBuilder('o')
        .innerJoinAndSelect('o.location', 'loc')
        .innerJoinAndSelect('o.customer', 'c')
        .leftJoinAndSelect('o.items', 'oi')
        .where('o.status = :status', { status: EOrderStatus.Packed })
        .andWhere('o.fulfillment_mode = :mode', { mode: EFulfillmentMode.Pickup })
        .andWhere('loc.organization_id = :orgId', { orgId: filter.organizationId });

      if (filter.locationId) {
        qb.andWhere('o.fulfillment_location_id = :locationId', { locationId: filter.locationId });
      }
      if (filter.search?.trim()) {
        const q = `%${filter.search.trim()}%`;
        qb.andWhere('(o.order_number ILIKE :q OR c.name ILIKE :q)', { q });
      }

      qb.orderBy('o.packedAt', 'ASC');
      qb.skip((page - 1) * perPage).take(perPage);

      const [entities, totalCount] = await qb.getManyAndCount();
      const pickerIds = [...new Set(entities.map((e) => e.packedByUserId).filter(Boolean))] as string[];
      const pickers = pickerIds.length
        ? await this.internalRepo.manager.getRepository(UserEntity).findBy({ id: In(pickerIds) })
        : [];
      const pickerNameById = new Map(
        pickers.map((u) => [u.id, `${u.firstName ?? ''} ${u.lastName ?? ''}`.trim()]),
      );

      const items: PackedOrderRow[] = entities.map((entity) => ({
        id: entity.id,
        orderNumber: entity.orderNumber,
        customerId: entity.customerId,
        customerName: entity.customer?.name ?? '',
        deliveryAddress: entity.customer?.address ?? '',
        pickerName: entity.packedByUserId ? (pickerNameById.get(entity.packedByUserId) ?? '') : '',
        packedAt: entity.packedAt!,
        itemCount: entity.items?.length ?? 0,
        locationId: entity.fulfillmentLocationId ?? entity.locationId,
        organizationId: entity.location?.organizationId ?? '',
        fulfillmentMode: entity.fulfillmentMode,
      }));

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
}
