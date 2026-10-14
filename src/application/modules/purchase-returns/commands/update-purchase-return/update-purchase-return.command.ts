import { CommandBase } from '../../../../../common';
import { CreatePurchaseReturnItemCommand } from '../create-purchase-return/create-purchase-return.command';

export class UpdatePurchaseReturnCommand extends CommandBase {
  public id: string;
  public reason?: string;
  public notes?: string;
  public items?: CreatePurchaseReturnItemCommand[];
}
