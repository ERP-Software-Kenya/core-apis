import { AutoMap } from '@automapper/classes';
import { CommandBase } from '../../../../../common';

export class AssignUserToOrgCommand extends CommandBase {
  @AutoMap() public clerkUserId: string;
  @AutoMap() public organizationId: string;
  @AutoMap() public role: string;
}
