import { Inject } from '@nestjs/common';
import type { IQueryHandler } from '@nestjs/cqrs';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { QueryHandlerStrict } from '../../../../../common';
import { PAYMENT_TRANSACTION_REPO } from '../../../../constants';
import { PaymentTransaction } from '../../domain';
import { IPaymentTransactionRepo } from '../..';
import { GetPaymentTransactionQuery } from './get-payment-transaction.query';

@QueryHandlerStrict(GetPaymentTransactionQuery)
export class GetPaymentTransactionQueryHandler implements IQueryHandler<GetPaymentTransactionQuery, PaymentTransaction> {
  constructor(
    @Inject(PAYMENT_TRANSACTION_REPO) protected readonly repo: IPaymentTransactionRepo,
    @InjectPinoLogger(GetPaymentTransactionQueryHandler.name) protected readonly logger: PinoLogger,
  ) {}

  public async execute(query: GetPaymentTransactionQuery): Promise<PaymentTransaction> {
    this.logger.info(`Executing Query "${GetPaymentTransactionQuery.name}"`);
    return this.repo.getAsync(query.id);
  }
}
