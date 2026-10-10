import { IBaseRepo, Filter, PageableFilter } from '../../../common';
import { PaymentTransaction, PaymentTransactionFilter } from './domain';

export const PAYMENT_TRANSACTION_REPO = 'PAYMENT_TRANSACTION_REPO';

 
export interface IPaymentTransactionRepo extends IBaseRepo<PaymentTransaction, string, PageableFilter<PaymentTransactionFilter>, Filter<PaymentTransactionFilter>> {
  sumCompletedByReferenceAsync(referenceId: string, referenceType: string): Promise<number>;
}
