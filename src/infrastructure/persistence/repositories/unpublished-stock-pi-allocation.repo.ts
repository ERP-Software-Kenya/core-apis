import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { Repository } from 'typeorm';
import { BaseRepo, Filter, PageableFilter } from '../../../common';
import { UnpublishedStockPurchaseItemAllocationEntity } from '../entities';
import { UnpublishedStockPurchaseItemAllocation } from '../../../application/modules/unpublished-stock-purchase-orders/domain';
import { IUnpublishedStockPIAllocationRepo, UnpublishedStockPIAllocationFilter } from '../../../application/modules/unpublished-stock-purchase-orders/i-unpublished-stock-pi-allocation.repo';

@Injectable()
export class UnpublishedStockPIAllocationRepo
  extends BaseRepo<
    UnpublishedStockPurchaseItemAllocationEntity,
    UnpublishedStockPurchaseItemAllocation,
    string,
    PageableFilter<UnpublishedStockPIAllocationFilter>,
    Filter<UnpublishedStockPIAllocationFilter>
  >
  implements IUnpublishedStockPIAllocationRepo
{
  constructor(
    @InjectRepository(UnpublishedStockPurchaseItemAllocationEntity) internalRepo: Repository<UnpublishedStockPurchaseItemAllocationEntity>,
    @InjectMapper() mapper: Mapper,
    @InjectPinoLogger(UnpublishedStockPIAllocationRepo.name) logger: PinoLogger,
  ) {
    super(internalRepo, mapper, logger, UnpublishedStockPurchaseItemAllocationEntity, UnpublishedStockPurchaseItemAllocation);
  }

  public override get idColumnName(): keyof UnpublishedStockPurchaseItemAllocationEntity {
    return 'id';
  }
}
