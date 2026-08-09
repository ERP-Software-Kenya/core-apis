import { AutoMap } from '@automapper/classes';
import { CommandBase } from '../../../../../common';

export class RevokeInvitationCommand extends CommandBase {
  @AutoMap() public invitationId: string;
}
