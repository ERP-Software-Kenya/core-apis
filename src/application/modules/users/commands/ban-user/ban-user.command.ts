import { AutoMap } from '@automapper/classes';
import { CommandBase } from '../../../../../common';

export class BanUserCommand extends CommandBase {
  @AutoMap() public clerkUserId: string;
}
