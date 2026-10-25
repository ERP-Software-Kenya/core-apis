import { CommandBase } from '../../../../../common';

export class FinalizePurchaseReturnCommand extends CommandBase {
  public id: string;
  public performedById?: string;
}
