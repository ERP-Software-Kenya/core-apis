import { IBaseRepo, Filter } from '../../../common';
import { UnpublishedStockPOPayment } from './domain';

export interface UnpublishedStockPOPaymentFilter {
  purchaseOrderId?: string;
  supplierId?: string;
  organizationId?: string;
}

export const UNPUBLISHED_STOCK_PO_PAYMENT_REPO = 'UNPUBLISHED_STOCK_PO_PAYMENT_REPO';

export type IUnpublishedStockPOPaymentRepo = IBaseRepo<UnpublishedStockPOPayment, string, Filter<UnpublishedStockPOPaymentFilter>, Filter<UnpublishedStockPOPaymentFilter>>;
