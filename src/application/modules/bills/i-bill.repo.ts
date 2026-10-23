import { IBaseRepo, Filter, PageableFilter } from '../../../common';
import { Bill, BillFilter } from './domain';
import { EBillStatus, EPaymentMethod } from '../../../infrastructure/persistence/entities';

export const BILL_REPO = 'BILL_REPO';

export interface CompleteBillInput {
  billId: string;
  performedById: string;
  creditLimitOverride: boolean;
  paymentMethod?: string;
}

export interface IBillRepo extends IBaseRepo<Bill, string, PageableFilter<BillFilter>, Filter<BillFilter>> {
  countForDateAsync(date: Date): Promise<number>;
  findBySourceOrderIdAsync(orderId: string): Promise<Bill | null>;
  completeAsync(input: CompleteBillInput): Promise<Bill>;
  transitionOpenBillAsync(id: string, status: EBillStatus, paymentMethod?: EPaymentMethod): Promise<Bill>;
}
