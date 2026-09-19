import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { Repository } from 'typeorm';
import { BaseRepo, Filter, PageableFilter } from '../../../common';
import { UnpublishedStockPurchaseOrderEntity } from '../entities';
import { UnpublishedStockPurchaseOrder, UnpublishedStockPOFilter } from '../../../application/modules/unpublished-stock-purchase-orders/domain';
import { IUnpublishedStockPORepo } from '../../../application/modules/unpublished-stock-purchase-orders/i-unpublished-stock-po.repo';

@Injectable()
export class UnpublishedStockPORepo
  extends BaseRepo<
    UnpublishedStockPurchaseOrderEntity,
    UnpublishedStockPurchaseOrder,
    string,
    PageableFilter<UnpublishedStockPOFilter>,
    Filter<UnpublishedStockPOFilter>
  >
  implements IUnpublishedStockPORepo
{
  constructor(
    @InjectRepository(UnpublishedStockPurchaseOrderEntity) internalRepo: Repository<UnpublishedStockPurchaseOrderEntity>,
    @InjectMapper() mapper: Mapper,
    @InjectPinoLogger(UnpublishedStockPORepo.name) logger: PinoLogger,
  ) {
    super(internalRepo, mapper, logger, UnpublishedStockPurchaseOrderEntity, UnpublishedStockPurchaseOrder);
  }

  public override get idColumnName(): keyof UnpublishedStockPurchaseOrderEntity {
    return 'id';
  }
}
