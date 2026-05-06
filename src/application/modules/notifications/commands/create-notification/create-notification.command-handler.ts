import { Inject } from '@nestjs/common';
import { ICommandHandler, CommandHandler } from '@nestjs/cqrs';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { NOTIFICATION_REPO, INotificationRepo } from '../..';
import { Notification } from '../../domain';
import { CreateNotificationCommand } from './create-notification.command';

@CommandHandler(CreateNotificationCommand)
export class CreateNotificationCommandHandler implements ICommandHandler<CreateNotificationCommand, Notification> {
  constructor(
    @Inject(NOTIFICATION_REPO) protected readonly repo: INotificationRepo,
    @InjectPinoLogger(CreateNotificationCommandHandler.name) protected readonly logger: PinoLogger,
  ) {}

  public async execute(command: CreateNotificationCommand): Promise<Notification> {
    this.logger.info(`Executing Command "${CreateNotificationCommand.name}"`);
    const notification = new Notification();
    notification.userId = command.userId;
    notification.orgId = command.orgId;
    notification.type = command.type;
    notification.title = command.title;
    notification.body = command.body;
    return this.repo.createAsync(notification);
  }
}
