import { Inject } from '@nestjs/common';
import { IQueryHandler } from '@nestjs/cqrs';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { QueryHandlerStrict } from '../../../../../common';
import { ACTIVITY_LOG_REPO } from '../../../../constants';
import { ActivityLog } from '../../domain';
import { IActivityLogRepo } from '../..';
import { GetActivityLogQuery } from './get-activity-log.query';

@QueryHandlerStrict(GetActivityLogQuery)
export class GetActivityLogQueryHandler implements IQueryHandler<GetActivityLogQuery, ActivityLog> {
  constructor(
    @Inject(ACTIVITY_LOG_REPO) private readonly repo: IActivityLogRepo,
    @InjectPinoLogger(GetActivityLogQueryHandler.name) private readonly logger: PinoLogger,
  ) {}

  public async execute(query: GetActivityLogQuery): Promise<ActivityLog> {
    this.logger.info(`Executing ${GetActivityLogQuery.name} id=${query.id}`);
    return this.repo.getAsync(query.id);
  }
}
