import { IBaseRepo } from '../../../common';
import { Filter, PageableFilter } from '../../../common';
import { PurchaseOrder } from './domain';
import { EPurchaseOrderStatus } from 'src/application/shared/enums';

export interface PurchaseOrderFilter {
  organizationId?: string;
  branchId?: string;
  supplierId?: string;
  status?: EPurchaseOrderStatus;
}

export const PURCHASE_ORDER_REPO = 'PURCHASE_ORDER_REPO';

export interface PurchaseOrderPaymentInput {
  purchaseOrderId: string;
  organizationId: string;
  amount: number;
  paymentMethod: string;
  paidAt: Date;
  note?: string;
  performedById?: string;
}

export interface CreatePurchaseOrderInput {
  organizationId: string;
  branchId?: string;
  supplierId: string;
  createdById?: string;
  expectedAt?: string;
  notes?: string;
  items: Array<{ productId: string; quantityOrdered: number; unitCost: number }>;
}

export interface PurchaseReceiptInput {
  purchaseOrderId: string;
  organizationId: string;
  items: Array<{ purchaseItemId: string; quantityReceived: number }>;
}

export interface PurchaseAllocationInput {
  purchaseOrderId: string;
  organizationId: string;
  allocations: Array<{ purchaseItemId: string; locationId: string; quantity: number }>;
  performedById?: string;
  notes?: string;
}

export interface IPurchaseOrderRepo
  extends IBaseRepo<PurchaseOrder, string, PageableFilter<PurchaseOrderFilter>, Filter<PurchaseOrderFilter>> {
  createWithItemsAsync(input: CreatePurchaseOrderInput): Promise<PurchaseOrder>;
  recordPaymentAsync(input: PurchaseOrderPaymentInput): Promise<PurchaseOrder>;
  receiveAsync(input: PurchaseReceiptInput): Promise<PurchaseOrder>;
  allocateAsync(input: PurchaseAllocationInput): Promise<PurchaseOrder>;
  updateDraftAsync(id: string, patch: { expectedAt?: string; notes?: string; status?: EPurchaseOrderStatus }): Promise<PurchaseOrder>;
  deleteDraftAsync(id: string): Promise<void>;
}
