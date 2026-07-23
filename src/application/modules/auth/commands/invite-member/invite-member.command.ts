import { AutoMap } from '@automapper/classes';
import { CommandBase } from 'src/common';

export class InviteMemberCommand extends CommandBase {
  @AutoMap() public organizationId: string;
  @AutoMap() public invitedByUserId: string;
  @AutoMap() public email: string;
  @AutoMap() public roleId: string;
}
