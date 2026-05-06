import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { Repository } from 'typeorm';
import { BaseRepo, Filter, PageableFilter } from '../../../common';
import { PaymentTransactionEntity } from '../entities';
import { PaymentTransaction } from '../../../application/modules/payment-transactions/domain';
import { IPaymentTransactionRepo, PaymentTransactionFilter } from '../../../application/modules/payment-transactions';

@Injectable()
export class PaymentTransactionRepo extends BaseRepo<PaymentTransactionEntity, PaymentTransaction, string, PageableFilter<PaymentTransactionFilter>, Filter<PaymentTransactionFilter>> implements IPaymentTransactionRepo {
  constructor(
    @InjectRepository(PaymentTransactionEntity) internalRepo: Repository<PaymentTransactionEntity>,
    @InjectMapper() mapper: Mapper,
    @InjectPinoLogger(PaymentTransactionRepo.name) logger: PinoLogger,
  ) {
    super(internalRepo, mapper, logger, PaymentTransactionEntity, PaymentTransaction);
  }

  public override get idColumnName(): keyof PaymentTransactionEntity {
    return 'id';
  }
}
