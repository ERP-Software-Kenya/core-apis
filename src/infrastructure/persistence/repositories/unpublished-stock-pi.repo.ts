import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { Repository } from 'typeorm';
import { BaseRepo, Filter, PageableFilter } from '../../../common';
import { UnpublishedStockPurchaseItemEntity } from '../entities';
import { UnpublishedStockPurchaseItem } from '../../../application/modules/unpublished-stock-purchase-orders/domain';
import { IUnpublishedStockPIRepo, UnpublishedStockPIFilter } from '../../../application/modules/unpublished-stock-purchase-orders/i-unpublished-stock-pi.repo';

@Injectable()
export class UnpublishedStockPIRepo
  extends BaseRepo<
    UnpublishedStockPurchaseItemEntity,
    UnpublishedStockPurchaseItem,
    string,
    PageableFilter<UnpublishedStockPIFilter>,
    Filter<UnpublishedStockPIFilter>
  >
  implements IUnpublishedStockPIRepo
{
  constructor(
    @InjectRepository(UnpublishedStockPurchaseItemEntity) internalRepo: Repository<UnpublishedStockPurchaseItemEntity>,
    @InjectMapper() mapper: Mapper,
    @InjectPinoLogger(UnpublishedStockPIRepo.name) logger: PinoLogger,
  ) {
    super(internalRepo, mapper, logger, UnpublishedStockPurchaseItemEntity, UnpublishedStockPurchaseItem);
  }

  public override get idColumnName(): keyof UnpublishedStockPurchaseItemEntity {
    return 'id';
  }
}
