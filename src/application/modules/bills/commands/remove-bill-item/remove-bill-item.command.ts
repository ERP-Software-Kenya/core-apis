import { CommandBase } from '../../../../../common';

export class RemoveBillItemCommand extends CommandBase {
  public billId: string;
  public itemId: string;
}
