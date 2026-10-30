import { AutoMap } from '@automapper/classes';
import { CommandBase } from '../../../../../common';

export class AcceptInvitationCommand extends CommandBase {
  @AutoMap() public rawToken: string;
  @AutoMap() public authenticatedEmail: string;
  @AutoMap() public clerkUserId: string;
  @AutoMap() public firstName?: string;
  @AutoMap() public lastName?: string;
  @AutoMap() public imageUrl?: string;
}
