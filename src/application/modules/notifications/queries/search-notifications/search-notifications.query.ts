import { AutoMap } from '@automapper/classes';
import { PageableFilter } from '../../../../../common';
import { NotificationFilter } from '../../domain';
import { ListNotificationsQuery } from '../list-notifications/list-notifications.query';

export class SearchNotificationsQuery extends ListNotificationsQuery implements PageableFilter<NotificationFilter> {
  @AutoMap() public $page?: number;
  @AutoMap() public $perPage?: number;
}
