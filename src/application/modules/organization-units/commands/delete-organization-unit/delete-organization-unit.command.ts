import { AutoMap } from '@automapper/classes';
import { CommandBase } from 'src/common';

export class DeleteOrganizationUnitCommand extends CommandBase {
  @AutoMap() public id: string;
}
