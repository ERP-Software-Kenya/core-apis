import { IBaseRepo, Filter, PageableFilter } from '../../../common';
import { PaymentTransaction, PaymentTransactionFilter } from './domain';

export const PAYMENT_TRANSACTION_REPO = 'PAYMENT_TRANSACTION_REPO';

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface IPaymentTransactionRepo extends IBaseRepo<PaymentTransaction, string, PageableFilter<PaymentTransactionFilter>, Filter<PaymentTransactionFilter>> {}
