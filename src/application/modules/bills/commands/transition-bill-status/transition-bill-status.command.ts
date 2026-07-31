import { AutoMap } from '@automapper/classes';
import { CommandBase } from '../../../../../common';
import { EBillStatus, EPaymentMethod } from '../../../../../infrastructure/persistence/entities/bill.entity';

export class TransitionBillStatusCommand extends CommandBase {
  public billId: string;
  @AutoMap() public status: EBillStatus;
  @AutoMap() public paymentMethod?: EPaymentMethod;
}
