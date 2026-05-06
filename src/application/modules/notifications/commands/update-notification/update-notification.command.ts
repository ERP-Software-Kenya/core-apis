import { AutoMap } from '@automapper/classes';
import { CommandBase } from '../../../../../common';

export class UpdateNotificationCommand extends CommandBase {
  @AutoMap() public id: string;
  @AutoMap() public readAt?: Date;
}
