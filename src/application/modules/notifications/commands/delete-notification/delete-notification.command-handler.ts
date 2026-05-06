import { Inject } from '@nestjs/common';
import { ICommandHandler, CommandHandler } from '@nestjs/cqrs';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { NOTIFICATION_REPO, INotificationRepo } from '../..';
import { DeleteNotificationCommand } from './delete-notification.command';

@CommandHandler(DeleteNotificationCommand)
export class DeleteNotificationCommandHandler implements ICommandHandler<DeleteNotificationCommand, boolean> {
  constructor(
    @Inject(NOTIFICATION_REPO) protected readonly repo: INotificationRepo,
    @InjectPinoLogger(DeleteNotificationCommandHandler.name) protected readonly logger: PinoLogger,
  ) {}

  public async execute(command: DeleteNotificationCommand): Promise<boolean> {
    this.logger.info(`Executing Command "${DeleteNotificationCommand.name}"`);
    await this.repo.deleteAsync(command.id);
    return true;
  }
}
