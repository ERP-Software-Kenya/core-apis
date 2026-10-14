import { RecordPurchaseReturnRefundInput } from '../../i-purchase-return.repo';
export class RecordPurchaseReturnRefundCommand implements RecordPurchaseReturnRefundInput {
  id: string; organizationId: string; amount: number; paymentMethod: string; receivedAt: Date; note?: string; performedById?: string;
}
