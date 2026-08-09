import { AutoMap } from '@automapper/classes';
import { QueryBase } from '../../../../../common';

export class GetUnreadNotificationCountQuery extends QueryBase {
  @AutoMap() public userId: string;
}
