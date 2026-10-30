import { AutoMap } from '@automapper/classes';
import { EActivityAction } from '../../../../infrastructure/persistence/entities/activity-log.entity';

export class NotificationSetting {
  @AutoMap() public id: string;
  @AutoMap() public organizationId: string;
  @AutoMap(() => String) public event: EActivityAction;
  @AutoMap() public isEnabled: boolean;
  @AutoMap(() => Date) public createdAt: Date;
  @AutoMap(() => Date) public updatedAt?: Date;
}
