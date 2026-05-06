import { Inject } from '@nestjs/common';
import type { IQueryHandler } from '@nestjs/cqrs';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { QueryHandlerStrict, IFilterNormalizer } from '../../../../../common';
import { PAYMENT_TRANSACTION_REPO } from '../../../../constants';
import { PaymentTransaction, PaymentTransactionFilter } from '../../domain';
import { IPaymentTransactionRepo } from '../../i-payment-transaction.repo';
import { PaymentTransactionFilterNormalizer } from '../../helpers';
import { ListPaymentTransactionsQuery } from './list-payment-transactions.query';

@QueryHandlerStrict(ListPaymentTransactionsQuery)
export class ListPaymentTransactionsQueryHandler implements IQueryHandler<ListPaymentTransactionsQuery, PaymentTransaction[]> {
  constructor(
    @Inject(PAYMENT_TRANSACTION_REPO) protected readonly repo: IPaymentTransactionRepo,
    @Inject(PaymentTransactionFilterNormalizer) protected readonly filterNormalizer: IFilterNormalizer<PaymentTransactionFilter>,
    @InjectPinoLogger(ListPaymentTransactionsQueryHandler.name) protected readonly logger: PinoLogger,
  ) {}

  public async execute(query: ListPaymentTransactionsQuery): Promise<PaymentTransaction[]> {
    this.logger.info(`Executing Query "${ListPaymentTransactionsQuery.name}"`);
    const filter = this.filterNormalizer.normalize(query);
    return this.repo.allAsync(filter);
  }
}
