import { CommandBase } from '../../../../../common';
import { RecordPurchaseReturnRefundInput } from '../../i-purchase-return.repo';

export class RecordPurchaseReturnRefundCommand extends CommandBase implements RecordPurchaseReturnRefundInput {
  public id: string;
  public organizationId: string;
  public amount: number;
  public paymentMethod: string;
  public receivedAt: Date;
  public note?: string;
  public performedById?: string;
}
