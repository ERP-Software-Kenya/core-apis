import { CreateBlackPurchaseReturnInput } from '../../i-unpublished-stock-po.repo';
export class CreateUnpublishedStockPurchaseReturnCommand implements CreateBlackPurchaseReturnInput {
  purchaseOrderId: string;
  organizationId: string;
  createdById?: string;
  reason?: string;
  notes?: string;
  items: Array<{ purchaseItemId: string; locationId: string; quantity: number; reason?: string }>;
}
