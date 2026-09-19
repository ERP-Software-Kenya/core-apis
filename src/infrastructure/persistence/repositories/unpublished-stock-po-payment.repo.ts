import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { Repository } from 'typeorm';
import { BaseRepo, Filter } from '../../../common';
import { UnpublishedStockPOPaymentEntity } from '../entities';
import { UnpublishedStockPOPayment } from '../../../application/modules/unpublished-stock-purchase-orders/domain';
import { IUnpublishedStockPOPaymentRepo, UnpublishedStockPOPaymentFilter } from '../../../application/modules/unpublished-stock-purchase-orders/i-unpublished-stock-po-payment.repo';

@Injectable()
export class UnpublishedStockPOPaymentRepo
  extends BaseRepo<
    UnpublishedStockPOPaymentEntity,
    UnpublishedStockPOPayment,
    string,
    Filter<UnpublishedStockPOPaymentFilter>,
    Filter<UnpublishedStockPOPaymentFilter>
  >
  implements IUnpublishedStockPOPaymentRepo
{
  constructor(
    @InjectRepository(UnpublishedStockPOPaymentEntity) internalRepo: Repository<UnpublishedStockPOPaymentEntity>,
    @InjectMapper() mapper: Mapper,
    @InjectPinoLogger(UnpublishedStockPOPaymentRepo.name) logger: PinoLogger,
  ) {
    super(internalRepo, mapper, logger, UnpublishedStockPOPaymentEntity, UnpublishedStockPOPayment);
  }

  public override get idColumnName(): keyof UnpublishedStockPOPaymentEntity {
    return 'id';
  }
}
