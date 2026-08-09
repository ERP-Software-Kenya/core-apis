import { AutoMap } from '@automapper/classes';
import { CommandBase } from '../../../../../common';
import { EBillStatus, EPaymentMethod } from '../../../../../infrastructure/persistence/entities';

export class TransitionBillStatusCommand extends CommandBase {
  @AutoMap() public id: string;
  @AutoMap(() => String) public status: EBillStatus;
  @AutoMap(() => String) public paymentMethod?: EPaymentMethod;
  /** Set by the controller from AuthenticatedUser.dbUserId. */
  public performedById: string;
}
