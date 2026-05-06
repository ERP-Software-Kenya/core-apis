import { Inject } from '@nestjs/common';
import type { IQueryHandler } from '@nestjs/cqrs';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { QueryHandlerStrict, IFilterNormalizer, IPageable } from '../../../../../common';
import { PAYMENT_TRANSACTION_REPO } from '../../../../constants';
import { PaymentTransaction, PaymentTransactionFilter } from '../../domain';
import { IPaymentTransactionRepo } from '../..';
import { PaymentTransactionFilterNormalizer } from '../../helpers';
import { SearchPaymentTransactionsQuery } from './search-payment-transactions.query';

@QueryHandlerStrict(SearchPaymentTransactionsQuery)
export class SearchPaymentTransactionsQueryHandler implements IQueryHandler<SearchPaymentTransactionsQuery, IPageable<PaymentTransaction>> {
  constructor(
    @Inject(PAYMENT_TRANSACTION_REPO) protected readonly repo: IPaymentTransactionRepo,
    @Inject(PaymentTransactionFilterNormalizer) protected readonly filterNormalizer: IFilterNormalizer<PaymentTransactionFilter>,
    @InjectPinoLogger(SearchPaymentTransactionsQueryHandler.name) protected readonly logger: PinoLogger,
  ) {}

  public async execute(query: SearchPaymentTransactionsQuery): Promise<IPageable<PaymentTransaction>> {
    this.logger.info(`Executing Query "${SearchPaymentTransactionsQuery.name}"`);
    const filter = this.filterNormalizer.pageableNormalize(query);
    return this.repo.pagedAsync(filter);
  }
}
