import { AutoMap } from '@automapper/classes';
import { CommandBase } from '../../../../../common';
import { ERole } from '../../../../../infrastructure';

export class CreateInvitationCommand extends CommandBase {
  @AutoMap() public email: string;
  @AutoMap() public roleId: string;
  @AutoMap() public locationId?: string;
  @AutoMap() public firstName?: string;
  @AutoMap() public lastName?: string;
  @AutoMap() public organizationId?: string;
  public currentUserId: string;
  public currentOrganizationId?: string;
  public currentRoles: ERole[];
}
