import { AutoMap } from '@automapper/classes';
import { CommandBase } from '../../../../../common';
import { ERole } from '../../../../../infrastructure';

export class ResendInvitationCommand extends CommandBase {
  @AutoMap() public id: string;
  public currentOrganizationId?: string;
  public currentRoles: ERole[];
}
