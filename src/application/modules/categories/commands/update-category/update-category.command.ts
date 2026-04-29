import { AutoMap } from '@automapper/classes';
import { CommandBase } from "src/common";

export class UpdateCategoryCommand extends CommandBase {
  @AutoMap() public id: string;
  @AutoMap() public name?: string;
}
