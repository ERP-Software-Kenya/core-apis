import { AutoMap } from '@automapper/classes';
import { CommandBase } from "src/common";

export class CreateProductCommand extends CommandBase {
  @AutoMap() public name?: string;
}
