import { AutoMap } from '@automapper/classes';
import { CommandBase } from '../../../../../common';

export class UnbanUserCommand extends CommandBase {
  @AutoMap() public clerkUserId: string;
}
