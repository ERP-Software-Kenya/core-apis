import { AutoMap } from '@automapper/classes';
import { CommandBase } from "src/common";

export class UpdatePurchaseOrderCommand extends CommandBase {
  @AutoMap() public id: string;
  @AutoMap() public name?: string;
}
