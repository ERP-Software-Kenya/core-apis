import { AutoMap } from '@automapper/classes';
import { CommandBase } from '../../../../../common';

export class DeleteUserCommand extends CommandBase {
  @AutoMap() public clerkUserId: string;
}
