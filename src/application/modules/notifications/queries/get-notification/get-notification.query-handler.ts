import { Inject } from '@nestjs/common';
import type { IQueryHandler } from '@nestjs/cqrs';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { QueryHandlerStrict } from '../../../../../common';
import { NOTIFICATION_REPO } from '../../../../constants';
import { Notification } from '../../domain';
import { INotificationRepo } from '../..';
import { GetNotificationQuery } from './get-notification.query';

@QueryHandlerStrict(GetNotificationQuery)
export class GetNotificationQueryHandler implements IQueryHandler<GetNotificationQuery, Notification> {
  constructor(
    @Inject(NOTIFICATION_REPO) protected readonly repo: INotificationRepo,
    @InjectPinoLogger(GetNotificationQueryHandler.name) protected readonly logger: PinoLogger,
  ) {}

  public async execute(query: GetNotificationQuery): Promise<Notification> {
    this.logger.info(`Executing Query "${GetNotificationQuery.name}"`);
    return this.repo.getAsync(query.id);
  }
}
