import { CommandBase } from '../../../../../common';
import { EPaymentMethod } from '../../../../../infrastructure/persistence/entities';

export class RecordOrderPaymentCommand extends CommandBase {
  public orderId: string;
  public organizationId: string;
  public amount: number;
  public method: EPaymentMethod;
  public reference?: string;
  public performedById?: string;
}
