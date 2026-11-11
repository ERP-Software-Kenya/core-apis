import { AutoMap } from '@automapper/classes';
import { CommandBase } from '../../../../../common';
import { EActivityAction } from '../../../../../infrastructure/persistence/entities/activity-log.entity';

export class NotificationSettingItem {
  @AutoMap(() => String) public event: EActivityAction;
  @AutoMap() public isEnabled: boolean;
}

export class UpsertNotificationSettingsCommand extends CommandBase {
  @AutoMap() public organizationId: string;
  @AutoMap(() => [NotificationSettingItem]) public items: NotificationSettingItem[];
}
