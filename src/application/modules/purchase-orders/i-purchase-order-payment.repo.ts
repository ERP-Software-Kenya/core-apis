import { IBaseRepo, Filter } from '../../../common';
import { PurchaseOrderPayment } from './domain';

export interface PurchaseOrderPaymentFilter {
  purchaseOrderId?: string;
  supplierId?: string;
  organizationId?: string;
}

export const PURCHASE_ORDER_PAYMENT_REPO = 'IPurchaseOrderPaymentRepo';

export type IPurchaseOrderPaymentRepo = IBaseRepo<PurchaseOrderPayment, string, Filter<PurchaseOrderPaymentFilter>, Filter<PurchaseOrderPaymentFilter>>;
