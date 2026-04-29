import { AutoMap } from '@automapper/classes';
import { CommandBase } from "src/common";

export class CreateSupplierCommand extends CommandBase {
  @AutoMap() public name?: string;
}
