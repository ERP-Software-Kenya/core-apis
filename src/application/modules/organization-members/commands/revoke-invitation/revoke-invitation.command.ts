import { AutoMap } from '@automapper/classes';
import { CommandBase } from '../../../../../common';
import { ERole } from '../../../../../infrastructure';

export class RevokeInvitationCommand extends CommandBase {
  @AutoMap() public id: string;
  public currentUserId: string;
  public currentOrganizationId?: string;
  public currentRoles: ERole[];
}
