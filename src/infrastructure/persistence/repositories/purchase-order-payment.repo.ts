import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { Repository } from 'typeorm';
import { BaseRepo, Filter } from '../../../common';
import { PurchaseOrderPaymentEntity } from '../entities';
import { PurchaseOrderPayment } from '../../../application/modules/purchase-orders/domain';
import { IPurchaseOrderPaymentRepo, PurchaseOrderPaymentFilter } from '../../../application/modules/purchase-orders/i-purchase-order-payment.repo';

@Injectable()
export class PurchaseOrderPaymentRepo
  extends BaseRepo<
    PurchaseOrderPaymentEntity,
    PurchaseOrderPayment,
    string,
    Filter<PurchaseOrderPaymentFilter>,
    Filter<PurchaseOrderPaymentFilter>
  >
  implements IPurchaseOrderPaymentRepo
{
  constructor(
    @InjectRepository(PurchaseOrderPaymentEntity) internalRepo: Repository<PurchaseOrderPaymentEntity>,
    @InjectMapper() mapper: Mapper,
    @InjectPinoLogger(PurchaseOrderPaymentRepo.name) logger: PinoLogger,
  ) {
    super(internalRepo, mapper, logger, PurchaseOrderPaymentEntity, PurchaseOrderPayment);
  }

  public override get idColumnName(): keyof PurchaseOrderPaymentEntity {
    return 'id';
  }
}
