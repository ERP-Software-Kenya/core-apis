import { AutoMap } from '@automapper/classes';
import { CommandBase } from '../../../../../common';

export class CreateRoleCommand extends CommandBase {
  @AutoMap() public organizationId: string;
  @AutoMap() public name: string;
  @AutoMap() public permissions: Record<string, any>;
}
