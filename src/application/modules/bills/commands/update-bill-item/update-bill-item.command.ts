import { AutoMap } from '@automapper/classes';
import { CommandBase } from '../../../../../common';

export class UpdateBillItemCommand extends CommandBase {
  public billId: string;
  public itemId: string;
  @AutoMap() public quantity?: number;
  @AutoMap() public unitPrice?: number;
  @AutoMap() public taxRate?: number;
  @AutoMap() public discountAmount?: number;
}
