import { AutoMap } from '@automapper/classes';
import { CommandBase } from '../../../../../common';

export class RemoveUserFromOrgCommand extends CommandBase {
  @AutoMap() public clerkUserId: string;
  @AutoMap() public organizationId: string;
}
