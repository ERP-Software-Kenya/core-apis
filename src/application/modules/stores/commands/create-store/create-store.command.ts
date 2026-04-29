import { AutoMap } from '@automapper/classes';
import { CommandBase } from "src/common";

export class CreateStoreCommand extends CommandBase {
  @AutoMap() public name?: string;
}
