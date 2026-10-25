import { AutoMap } from '@automapper/classes';
import { CommandBase } from 'src/common';

export class CreateOrganizationUnitCommand extends CommandBase {
  @AutoMap() public organizationId: string;
  @AutoMap() public name: string;
  @AutoMap() public symbol: string;
  @AutoMap() public isActive?: boolean;
  @AutoMap() public sortOrder?: number;
}
