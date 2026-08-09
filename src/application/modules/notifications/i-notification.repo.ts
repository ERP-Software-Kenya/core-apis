import { IBaseRepo, Filter, PageableFilter } from '../../../common';
import { NotificationFilter, Notification } from './domain';

export const NOTIFICATION_REPO = 'NOTIFICATION_REPO';

export interface INotificationRepo extends IBaseRepo<Notification, string, PageableFilter<NotificationFilter>, Filter<NotificationFilter>> {
  countUnreadAsync(userId: string): Promise<number>;
  markAllReadAsync(userId: string): Promise<void>;
}
