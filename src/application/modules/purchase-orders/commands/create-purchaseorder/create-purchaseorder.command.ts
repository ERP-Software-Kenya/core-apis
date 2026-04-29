import { AutoMap } from '@automapper/classes';
import { CommandBase } from "src/common";

export class CreatePurchaseOrderCommand extends CommandBase {
  @AutoMap() public name?: string;
}
