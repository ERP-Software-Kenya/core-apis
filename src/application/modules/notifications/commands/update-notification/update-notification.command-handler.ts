import { Inject } from '@nestjs/common';
import { ICommandHandler, CommandHandler } from '@nestjs/cqrs';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { INotificationRepo,NOTIFICATION_REPO } from '../../i-notification.repo';
import { Notification } from '../../domain';
import { UpdateNotificationCommand } from './update-notification.command';

@CommandHandler(UpdateNotificationCommand)
export class UpdateNotificationCommandHandler implements ICommandHandler<UpdateNotificationCommand, Notification> {
  constructor(
    @Inject(NOTIFICATION_REPO) protected readonly repo: INotificationRepo,
    @InjectPinoLogger(UpdateNotificationCommandHandler.name) protected readonly logger: PinoLogger,
  ) {}

  public async execute(command: UpdateNotificationCommand): Promise<Notification> {
    this.logger.info(`Executing Command "${UpdateNotificationCommand.name}"`);
    const notification = await this.repo.getAsync(command.id);
    if (command.readAt) notification.readAt = command.readAt;
    return this.repo.updateAsync(notification);
  }
}
