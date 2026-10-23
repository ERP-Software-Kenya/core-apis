import { AutoMap } from '@automapper/classes';
import { CommandBase } from 'src/common';

export class UpdateOrganizationUnitCommand extends CommandBase {
  @AutoMap() public id: string;
  @AutoMap() public name?: string;
  @AutoMap() public symbol?: string;
  @AutoMap() public isActive?: boolean;
  @AutoMap() public sortOrder?: number;
}
