export * from './list-notifications';
export * from './get-notification';
export * from './search-notifications';
export * from './get-unread-count';

import { ListNotificationsQueryHandler } from './list-notifications';
import { GetNotificationQueryHandler } from './get-notification';
import { SearchNotificationsQueryHandler } from './search-notifications';
import { GetUnreadNotificationCountQueryHandler } from './get-unread-count';

export const NotificationQueryHandlers = [
  ListNotificationsQueryHandler,
  GetNotificationQueryHandler,
  SearchNotificationsQueryHandler,
  GetUnreadNotificationCountQueryHandler,
];
