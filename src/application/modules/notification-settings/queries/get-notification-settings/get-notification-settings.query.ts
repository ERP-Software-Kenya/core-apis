import { AutoMap } from '@automapper/classes';
import { QueryBase } from '../../../../../common';

export class GetNotificationSettingsQuery extends QueryBase {
  @AutoMap() public organizationId: string;
}
