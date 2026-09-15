import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { Repository } from 'typeorm';
import { BaseRepo, DbException, Filter, PageableFilter } from '../../../common';
import { IPurchaseReturnItemRepo, PurchaseReturnItem, PurchaseReturnItemFilter } from '../../../application/modules/purchase-returns';
import { EPurchaseReturnItemSourceType, EPurchaseReturnStatus, PurchaseReturnItemEntity } from '../entities';

@Injectable()
export class PurchaseReturnItemRepo
  extends BaseRepo<PurchaseReturnItemEntity, PurchaseReturnItem, string, PageableFilter<PurchaseReturnItemFilter>, Filter<PurchaseReturnItemFilter>>
  implements IPurchaseReturnItemRepo
{
  constructor(
    @InjectRepository(PurchaseReturnItemEntity) internalRepo: Repository<PurchaseReturnItemEntity>,
    @InjectMapper() mapper: Mapper,
    @InjectPinoLogger(PurchaseReturnItemRepo.name) logger: PinoLogger,
  ) {
    super(internalRepo, mapper, logger, PurchaseReturnItemEntity, PurchaseReturnItem);
  }

  public override get idColumnName(): keyof PurchaseReturnItemEntity {
    return 'id';
  }

  public async sumFinalizedQuantityByPurchaseItemAsync(purchaseItemId: string, excludePurchaseReturnId?: string): Promise<number> {
    return this.sumFinalizedQuantity(purchaseItemId, undefined, undefined, excludePurchaseReturnId);
  }

  public async sumFinalizedQuantityByPurchaseItemAndSourceAsync(
    purchaseItemId: string,
    sourceType: EPurchaseReturnItemSourceType,
    excludePurchaseReturnId?: string,
  ): Promise<number> {
    return this.sumFinalizedQuantity(purchaseItemId, sourceType, undefined, excludePurchaseReturnId);
  }

  public async sumFinalizedAllocatedQuantityByPurchaseItemLocationAsync(
    purchaseItemId: string,
    locationId: string,
    excludePurchaseReturnId?: string,
  ): Promise<number> {
    return this.sumFinalizedQuantity(purchaseItemId, EPurchaseReturnItemSourceType.AllocatedStock, locationId, excludePurchaseReturnId);
  }

  public async allWithReturnStatusAsync(purchaseReturnId: string, status?: EPurchaseReturnStatus): Promise<PurchaseReturnItem[]> {
    try {
      const query = this.internalRepo
        .createQueryBuilder('item')
        .innerJoin('item.purchaseReturn', 'ret')
        .where('item.purchaseReturnId = :purchaseReturnId', { purchaseReturnId });
      if (status) query.andWhere('ret.status = :status', { status });
      const rows = await query.orderBy('item.createdAt', 'ASC').getMany();
      return this.mapToModelArray(rows);
    } catch (ex) {
      this.logger.error(ex);
      throw new DbException(ex);
    }
  }

  private async sumFinalizedQuantity(
    purchaseItemId: string,
    sourceType?: EPurchaseReturnItemSourceType,
    locationId?: string,
    excludePurchaseReturnId?: string,
  ): Promise<number> {
    try {
      const query = this.internalRepo
        .createQueryBuilder('item')
        .innerJoin('item.purchaseReturn', 'ret')
        .select('COALESCE(SUM(item.quantity), 0)', 'quantity')
        .where('ret.status = :status', { status: EPurchaseReturnStatus.Finalized })
        .andWhere('item.purchaseItemId = :purchaseItemId', { purchaseItemId });
      if (sourceType) query.andWhere('item.sourceType = :sourceType', { sourceType });
      if (locationId) query.andWhere('item.locationId = :locationId', { locationId });
      if (excludePurchaseReturnId) query.andWhere('item.purchaseReturnId != :excludePurchaseReturnId', { excludePurchaseReturnId });

      const row = await query.getRawOne<{ quantity: string }>();
      return Number(row?.quantity ?? 0);
    } catch (ex) {
      this.logger.error(ex);
      throw new DbException(ex);
    }
  }
}
