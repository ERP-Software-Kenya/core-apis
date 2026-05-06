import { Inject } from '@nestjs/common';
import type { IQueryHandler } from '@nestjs/cqrs';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { QueryHandlerStrict, IFilterNormalizer, IPageable } from '../../../../../common';
import { NOTIFICATION_REPO } from '../../../../constants';
import { Notification, NotificationFilter } from '../../domain';
import { INotificationRepo } from '../..';
import { NotificationFilterNormalizer } from '../../helpers';
import { SearchNotificationsQuery } from './search-notifications.query';

@QueryHandlerStrict(SearchNotificationsQuery)
export class SearchNotificationsQueryHandler implements IQueryHandler<SearchNotificationsQuery, IPageable<Notification>> {
  constructor(
    @Inject(NOTIFICATION_REPO) protected readonly repo: INotificationRepo,
    @Inject(NotificationFilterNormalizer) protected readonly filterNormalizer: IFilterNormalizer<NotificationFilter>,
    @InjectPinoLogger(SearchNotificationsQueryHandler.name) protected readonly logger: PinoLogger,
  ) {}

  public async execute(query: SearchNotificationsQuery): Promise<IPageable<Notification>> {
    this.logger.info(`Executing Query "${SearchNotificationsQuery.name}"`);
    const filter = this.filterNormalizer.pageableNormalize(query);
    return this.repo.pagedAsync(filter);
  }
}
