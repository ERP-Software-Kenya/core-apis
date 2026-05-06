export * from './list-notifications';
export * from './get-notification';
export * from './search-notifications';

import { ListNotificationsQueryHandler } from './list-notifications';
import { GetNotificationQueryHandler } from './get-notification';
import { SearchNotificationsQueryHandler } from './search-notifications';

export const NotificationQueryHandlers = [
  ListNotificationsQueryHandler,
  GetNotificationQueryHandler,
  SearchNotificationsQueryHandler,
];
