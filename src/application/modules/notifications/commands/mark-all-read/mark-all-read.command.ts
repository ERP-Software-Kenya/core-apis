import { AutoMap } from '@automapper/classes';
import { CommandBase } from '../../../../../common';

export class MarkAllNotificationsReadCommand extends CommandBase {
  @AutoMap() public userId: string;
}
