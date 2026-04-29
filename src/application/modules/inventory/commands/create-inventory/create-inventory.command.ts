import { AutoMap } from '@automapper/classes';
import { CommandBase } from "src/common";

export class CreateInventoryCommand extends CommandBase {
  @AutoMap() public name?: string;
}
