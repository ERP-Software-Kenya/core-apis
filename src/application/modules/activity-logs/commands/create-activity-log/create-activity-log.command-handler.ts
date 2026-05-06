import { Inject } from '@nestjs/common';
import { ICommandHandler } from '@nestjs/cqrs';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { CommandHandlerStrict } from '../../../../../common';
import { ACTIVITY_LOG_REPO } from '../../../../constants';
import { ActivityLog } from '../../domain';
import { IActivityLogRepo } from '../..';
import { CreateActivityLogCommand } from './create-activity-log.command';

@CommandHandlerStrict(CreateActivityLogCommand)
export class CreateActivityLogCommandHandler implements ICommandHandler<CreateActivityLogCommand, ActivityLog> {
  constructor(
    @Inject(ACTIVITY_LOG_REPO) private readonly repo: IActivityLogRepo,
    @InjectPinoLogger(CreateActivityLogCommandHandler.name) private readonly logger: PinoLogger,
  ) {}

  public async execute(command: CreateActivityLogCommand): Promise<ActivityLog> {
    this.logger.info(`Executing ${CreateActivityLogCommand.name}`);
    return this.repo.createAsync(command as any);
  }
}
