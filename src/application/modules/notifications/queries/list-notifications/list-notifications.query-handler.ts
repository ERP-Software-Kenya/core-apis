import { Inject } from '@nestjs/common';
import type { IQueryHandler } from '@nestjs/cqrs';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { QueryHandlerStrict, IFilterNormalizer } from '../../../../../common';
import { NOTIFICATION_REPO } from '../../../../constants';
import { Notification, NotificationFilter } from '../../domain';
import { INotificationRepo } from '../../i-notification.repo';
import { NotificationFilterNormalizer } from '../../helpers';
import { ListNotificationsQuery } from './list-notifications.query';

@QueryHandlerStrict(ListNotificationsQuery)
export class ListNotificationsQueryHandler implements IQueryHandler<ListNotificationsQuery, Notification[]> {
  constructor(
    @Inject(NOTIFICATION_REPO) protected readonly repo: INotificationRepo,
    @Inject(NotificationFilterNormalizer) protected readonly filterNormalizer: IFilterNormalizer<NotificationFilter>,
    @InjectPinoLogger(ListNotificationsQueryHandler.name) protected readonly logger: PinoLogger,
  ) {}

  public async execute(query: ListNotificationsQuery): Promise<Notification[]> {
    this.logger.info(`Executing Query "${ListNotificationsQuery.name}"`);
    const filter = this.filterNormalizer.normalize(query);
    return this.repo.allAsync(filter);
  }
}
