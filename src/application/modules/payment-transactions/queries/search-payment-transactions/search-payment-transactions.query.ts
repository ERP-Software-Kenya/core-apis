import { AutoMap } from '@automapper/classes';
import { PageableFilter } from '../../../../../common';
import { PaymentTransactionFilter } from '../../domain';
import { ListPaymentTransactionsQuery } from '../list-payment-transactions/list-payment-transactions.query';

export class SearchPaymentTransactionsQuery extends ListPaymentTransactionsQuery implements PageableFilter<PaymentTransactionFilter> {
  @AutoMap() public $page?: number;
  @AutoMap() public $perPage?: number;
}
