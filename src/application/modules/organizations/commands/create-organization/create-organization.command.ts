import { AutoMap } from '@automapper/classes';
import { CommandBase } from "src/common";

export class CreateOrganizationCommand extends CommandBase {
  @AutoMap() public name?: string;
}
