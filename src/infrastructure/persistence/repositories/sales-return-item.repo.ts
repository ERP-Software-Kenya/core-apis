import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { Repository } from 'typeorm';
import { BaseRepo, DbException, Filter, PageableFilter } from '../../../common';
import { ISalesReturnItemRepo, SalesReturnItem, SalesReturnItemFilter } from '../../../application/modules/sales-returns';
import { ESalesReturnStatus, SalesReturnItemEntity } from '../entities';

@Injectable()
export class SalesReturnItemRepo
  extends BaseRepo<SalesReturnItemEntity, SalesReturnItem, string, PageableFilter<SalesReturnItemFilter>, Filter<SalesReturnItemFilter>>
  implements ISalesReturnItemRepo
{
  constructor(
    @InjectRepository(SalesReturnItemEntity) internalRepo: Repository<SalesReturnItemEntity>,
    @InjectMapper() mapper: Mapper,
    @InjectPinoLogger(SalesReturnItemRepo.name) logger: PinoLogger,
  ) {
    super(internalRepo, mapper, logger, SalesReturnItemEntity, SalesReturnItem);
  }

  public override get idColumnName(): keyof SalesReturnItemEntity {
    return 'id';
  }

  public async sumFinalizedQuantityByBillItemAsync(billItemId: string, excludeSalesReturnId?: string): Promise<number> {
    const result = await this.sumFinalizedQuantitiesByBillItemsAsync([billItemId], excludeSalesReturnId);
    return result.get(billItemId) ?? 0;
  }

  public async sumFinalizedQuantitiesByBillItemsAsync(billItemIds: string[], excludeSalesReturnId?: string): Promise<Map<string, number>> {
    if (!billItemIds.length) return new Map();
    try {
      const query = this.internalRepo
        .createQueryBuilder('item')
        .innerJoin('item.salesReturn', 'ret')
        .select('item.billItemId', 'billItemId')
        .addSelect('COALESCE(SUM(item.quantity), 0)', 'quantity')
        .where('ret.status = :status', { status: ESalesReturnStatus.Finalized })
        .andWhere('item.billItemId IN (:...billItemIds)', { billItemIds })
        .groupBy('item.billItemId');

      if (excludeSalesReturnId) {
        query.andWhere('item.salesReturnId != :excludeSalesReturnId', { excludeSalesReturnId });
      }

      const rows = await query.getRawMany<{ billItemId: string; quantity: string }>();
      return new Map(rows.map((row) => [row.billItemId, Number(row.quantity ?? 0)]));
    } catch (ex) {
      this.logger.error(ex);
      throw new DbException(ex);
    }
  }

  public async allWithReturnStatusAsync(salesReturnId: string, status?: ESalesReturnStatus): Promise<SalesReturnItem[]> {
    try {
      const query = this.internalRepo
        .createQueryBuilder('item')
        .innerJoin('item.salesReturn', 'ret')
        .where('item.salesReturnId = :salesReturnId', { salesReturnId });
      if (status) query.andWhere('ret.status = :status', { status });
      const rows = await query.orderBy('item.createdAt', 'ASC').getMany();
      return this.mapToModelArray(rows);
    } catch (ex) {
      this.logger.error(ex);
      throw new DbException(ex);
    }
  }
}
