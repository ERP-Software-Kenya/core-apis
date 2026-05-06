export * from './create-notification/create-notification.command';
export * from './create-notification/create-notification.command-handler';
export * from './update-notification/update-notification.command';
export * from './update-notification/update-notification.command-handler';
export * from './delete-notification/delete-notification.command';
export * from './delete-notification/delete-notification.command-handler';

import { CreateNotificationCommandHandler } from './create-notification/create-notification.command-handler';
import { UpdateNotificationCommandHandler } from './update-notification/update-notification.command-handler';
import { DeleteNotificationCommandHandler } from './delete-notification/delete-notification.command-handler';

export const NotificationCommandHandlers = [
  CreateNotificationCommandHandler,
  UpdateNotificationCommandHandler,
  DeleteNotificationCommandHandler,
];
