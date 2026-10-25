import { AutoMap } from '@automapper/classes';
import { CommandBase } from '../../../../../common';

export class RecordPurchaseOrderPaymentCommand extends CommandBase {
  @AutoMap() public purchaseOrderId: string;
  @AutoMap() public organizationId: string;
  @AutoMap() public amount: number;
  @AutoMap() public paymentMethod: string;
  @AutoMap(() => Date) public paidAt: Date;
  @AutoMap() public note?: string;
  @AutoMap() public performedById?: string;
}
