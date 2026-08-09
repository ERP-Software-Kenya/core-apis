import { Inject } from '@nestjs/common';
import { IQueryHandler } from '@nestjs/cqrs';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { QueryHandlerStrict } from '../../../../../common';
import { NOTIFICATION_REPO } from '../../i-notification.repo';
import { INotificationRepo } from '../../i-notification.repo';
import { GetUnreadNotificationCountQuery } from './get-unread-count.query';

@QueryHandlerStrict(GetUnreadNotificationCountQuery)
export class GetUnreadNotificationCountQueryHandler implements IQueryHandler<GetUnreadNotificationCountQuery, number> {
  constructor(
    @Inject(NOTIFICATION_REPO) private readonly repo: INotificationRepo,
    @InjectPinoLogger(GetUnreadNotificationCountQueryHandler.name) private readonly logger: PinoLogger,
  ) {}

  public async execute(query: GetUnreadNotificationCountQuery): Promise<number> {
    this.logger.info(`Executing ${GetUnreadNotificationCountQuery.name}`);
    return this.repo.countUnreadAsync(query.userId);
  }
}
