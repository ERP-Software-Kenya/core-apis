import { AutoMap } from '@automapper/classes';
import { CommandBase } from '../../../../../common';

export class RemoveBillItemCommand extends CommandBase {
  @AutoMap() public billId: string;
  @AutoMap() public itemId: string;
}
