import { AutoMap } from '@automapper/classes';
import { CommandBase } from '../../../../../common';
import { ERole } from '../../../../../infrastructure';

export class RemoveMemberCommand extends CommandBase {
  @AutoMap() public memberId: string;
  public currentUserId: string;
  public currentOrganizationId?: string;
  public currentRoles: ERole[];
}
