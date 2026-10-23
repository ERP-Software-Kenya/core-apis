import { CommandBase } from '../../../../../common';
import { RecordBlackPurchaseReturnRefundInput } from '../../i-unpublished-stock-po.repo';
export class RecordUnpublishedStockPurchaseReturnRefundCommand extends CommandBase implements RecordBlackPurchaseReturnRefundInput {
  purchaseOrderId: string;
  purchaseReturnId: string;
  organizationId: string;
  amount: number;
  paymentMethod: string;
  receivedAt: Date;
  note?: string;
  performedById?: string;
}
