import { AutoMap } from '@automapper/classes';
import { EOrder, Filter, QueryBase } from '../../../../../common';
import { NotificationFilter } from '../../domain';

export class ListNotificationsQuery extends QueryBase implements Filter<NotificationFilter> {
  @AutoMap() public userId?: string;
  @AutoMap() public orgId?: string;
  @AutoMap() public type?: string;

  @AutoMap() public $orderBy?: string;
  @AutoMap(() => String) public $order?: EOrder;
}
