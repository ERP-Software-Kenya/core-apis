import { IBaseRepo, Filter, PageableFilter } from '../../../common';
import { NotificationFilter,Notification } from './domain';


export const NOTIFICATION_REPO = 'NOTIFICATION_REPO';

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface INotificationRepo extends IBaseRepo<Notification, string, PageableFilter<NotificationFilter>, Filter<NotificationFilter>> {}
