import { AutoMap } from '@automapper/classes';
import { CommandBase } from "src/common";

export class CreateCategoryCommand extends CommandBase {
  @AutoMap() public name?: string;
}
