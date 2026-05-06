import { AutoMap } from '@automapper/classes';
import { CommandBase } from '../../../../../common';

export class CreateNotificationCommand extends CommandBase {
  @AutoMap() public userId: string;
  @AutoMap() public orgId: string;
  @AutoMap() public type: string;
  @AutoMap() public title: string;
  @AutoMap() public body: string;
}
