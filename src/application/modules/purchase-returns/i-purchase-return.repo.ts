import { Filter, IBaseRepo, PageableFilter } from '../../../common';
import { PurchaseReturn, PurchaseReturnFilter, PurchaseReturnItem } from './domain';

export type UpdatePurchaseReturnRecord = {
  id: string;
  reason?: string;
  notes?: string;
  items?: PurchaseReturnItem[];
  totalAmount?: number;
};
export type RecordPurchaseReturnRefundInput = { id: string; organizationId: string; amount: number; paymentMethod: string; receivedAt: Date; note?: string; performedById?: string };
export type PurchaseReturnRefundResult = { id: string; amount: number; refundedAmount: number; outstandingCredit: number };

export interface IPurchaseReturnRepo extends IBaseRepo<PurchaseReturn, string, PageableFilter<PurchaseReturnFilter>, Filter<PurchaseReturnFilter>> {
  getWithItemsAsync(id: string): Promise<PurchaseReturn | null>;
  finalizeAsync(id: string, performedById: string): Promise<PurchaseReturn>;
  updateDraftAsync(input: UpdatePurchaseReturnRecord): Promise<PurchaseReturn>;
  recordRefundAsync(input: RecordPurchaseReturnRefundInput): Promise<PurchaseReturnRefundResult>;
}
