import { Inject } from '@nestjs/common';
import { ICommandHandler } from '@nestjs/cqrs';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { CommandHandlerStrict } from '../../../../../common';
import { NOTIFICATION_REPO, INotificationRepo } from '../../i-notification.repo';
import { MarkAllNotificationsReadCommand } from './mark-all-read.command';

@CommandHandlerStrict(MarkAllNotificationsReadCommand)
export class MarkAllNotificationsReadCommandHandler implements ICommandHandler<MarkAllNotificationsReadCommand, void> {
  constructor(
    @Inject(NOTIFICATION_REPO) private readonly repo: INotificationRepo,
    @InjectPinoLogger(MarkAllNotificationsReadCommandHandler.name) private readonly logger: PinoLogger,
  ) {}

  public async execute(command: MarkAllNotificationsReadCommand): Promise<void> {
    this.logger.info({ userId: command.userId }, `Executing ${MarkAllNotificationsReadCommand.name}`);
    await this.repo.markAllReadAsync(command.userId);
  }
}
