import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { Repository } from 'typeorm';
import { BaseRepo, Filter, PageableFilter } from '../../../common';
import { CustomerCreditTransactionEntity } from '../entities';
import { CustomerCreditTransaction } from '../../../application/modules/credit-approvals/domain';
import { ICustomerCreditTransactionRepo } from '../../../application/modules/credit-approvals/i-customer-credit-transaction.repo';

@Injectable()
export class CustomerCreditTransactionRepo
  extends BaseRepo<
    CustomerCreditTransactionEntity,
    CustomerCreditTransaction,
    string,
    PageableFilter<CustomerCreditTransaction>,
    Filter<CustomerCreditTransaction>
  >
  implements ICustomerCreditTransactionRepo
{
  constructor(
    @InjectRepository(CustomerCreditTransactionEntity) internalRepo: Repository<CustomerCreditTransactionEntity>,
    @InjectMapper() mapper: Mapper,
    @InjectPinoLogger(CustomerCreditTransactionRepo.name) logger: PinoLogger,
  ) {
    super(internalRepo, mapper, logger, CustomerCreditTransactionEntity, CustomerCreditTransaction);
  }

  public override get idColumnName(): keyof CustomerCreditTransactionEntity {
    return 'id';
  }
}
