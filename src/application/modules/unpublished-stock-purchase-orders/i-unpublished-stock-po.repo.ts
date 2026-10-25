import { IBaseRepo, Filter, PageableFilter } from '../../../common';
import { UnpublishedStockPurchaseOrder, UnpublishedStockPOFilter } from './domain';
import { EPurchaseOrderStatus } from '../../shared/enums';

export type CreateBlackPurchaseInput = {
  organizationId: string;
  supplierId: string;
  branchId?: string;
  createdById?: string;
  expectedAt?: string;
  notes?: string;
  items: Array<{ productId: string; quantityOrdered: number; unitCost: number }>;
};

export type ReceiveBlackPurchaseInput = {
  purchaseOrderId: string;
  organizationId: string;
  items: Array<{ purchaseItemId: string; quantityReceived: number }>;
};

export type AllocateBlackPurchaseInput = {
  purchaseOrderId: string;
  organizationId: string;
  allocations: Array<{ purchaseItemId: string; locationId: string; quantity: number }>;
  performedById?: string;
  notes?: string;
};

export type PayBlackPurchaseInput = {
  purchaseOrderId: string;
  organizationId: string;
  amount: number;
  paymentMethod: string;
  paidAt: Date;
  note?: string;
  performedById?: string;
};

export type CreateBlackPurchaseReturnInput = {
  purchaseOrderId: string;
  organizationId: string;
  createdById?: string;
  reason?: string;
  notes?: string;
  items: Array<{ purchaseItemId: string; locationId: string; quantity: number; reason?: string }>;
};

export type BlackPurchaseReturnResult = { id: string; returnNumber: string; totalAmount: number; status: string };
export type RecordBlackPurchaseReturnRefundInput = {
  purchaseOrderId: string;
  purchaseReturnId: string;
  organizationId: string;
  amount: number;
  paymentMethod: string;
  receivedAt: Date;
  note?: string;
  performedById?: string;
};
export type BlackPurchaseReturnRefundResult = { id: string; amount: number; refundedAmount: number; outstandingCredit: number };

export const UNPUBLISHED_STOCK_PO_REPO = 'UNPUBLISHED_STOCK_PO_REPO';

export interface IUnpublishedStockPORepo extends IBaseRepo<
  UnpublishedStockPurchaseOrder,
  string,
  PageableFilter<UnpublishedStockPOFilter>,
  Filter<UnpublishedStockPOFilter>
> {
  createWithItemsAsync(input: CreateBlackPurchaseInput): Promise<UnpublishedStockPurchaseOrder>;
  receiveAsync(input: ReceiveBlackPurchaseInput): Promise<UnpublishedStockPurchaseOrder>;
  allocateAsync(input: AllocateBlackPurchaseInput): Promise<UnpublishedStockPurchaseOrder>;
  recordPaymentAsync(input: PayBlackPurchaseInput): Promise<UnpublishedStockPurchaseOrder>;
  createAndFinalizeReturnAsync(input: CreateBlackPurchaseReturnInput): Promise<BlackPurchaseReturnResult>;
  recordReturnRefundAsync(input: RecordBlackPurchaseReturnRefundInput): Promise<BlackPurchaseReturnRefundResult>;
  updateDraftAsync(id: string, patch: { expectedAt?: string; notes?: string; status?: EPurchaseOrderStatus }): Promise<UnpublishedStockPurchaseOrder>;
  deleteDraftAsync(id: string): Promise<void>;
}
