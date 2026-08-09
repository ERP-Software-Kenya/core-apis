import { IBaseRepo, Filter, PageableFilter } from '../../../common';
import { CustomerCreditTransaction } from './domain';

export const CUSTOMER_CREDIT_TRANSACTION_REPO = 'CUSTOMER_CREDIT_TRANSACTION_REPO';
export type ICustomerCreditTransactionRepo = IBaseRepo<
  CustomerCreditTransaction,
  string,
  PageableFilter<CustomerCreditTransaction>,
  Filter<CustomerCreditTransaction>
>;
