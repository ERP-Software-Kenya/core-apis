import { AutoMap } from '@automapper/classes';
import { CommandBase } from '../../../../../common';

export class InviteUserCommand extends CommandBase {
  @AutoMap() public email: string;
  @AutoMap(() => [String]) public roles?: string[];
  @AutoMap() public redirectUrl?: string;
}
