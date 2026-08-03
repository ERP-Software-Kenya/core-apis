import { AutoMap } from '@automapper/classes';
import { CommandBase } from '../../../../../common';

export class UpdateUserRolesCommand extends CommandBase {
  @AutoMap() public clerkUserId: string;
  @AutoMap(() => [String]) public roles: string[];
}
