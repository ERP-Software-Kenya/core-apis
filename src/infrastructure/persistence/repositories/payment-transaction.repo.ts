import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { Repository } from 'typeorm';
import { BaseRepo, DbException, Filter, PageableFilter } from '../../../common';
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

  public async sumCompletedByReferenceAsync(referenceId: string, referenceType: string): Promise<number> {
    try {
      const result = await this.internalRepo
        .createQueryBuilder('tx')
        .select('COALESCE(SUM(tx.amount), 0)', 'total')
        .where('tx.reference_id = :referenceId', { referenceId })
        .andWhere('tx.reference_type = :referenceType', { referenceType })
        .andWhere('tx.status = :status', { status: 'completed' })
        .getRawOne<{ total: string }>();
      return Number(result?.total ?? 0);
    } catch (ex) {
      this.logger.error(ex);
      throw new DbException(ex);
    }
  }
}
