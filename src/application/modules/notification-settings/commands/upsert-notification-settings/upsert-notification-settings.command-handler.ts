import { Inject } from '@nestjs/common';
import { ICommandHandler } from '@nestjs/cqrs';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { CommandHandlerStrict } from '../../../../../common';
import { NotificationSetting } from '../../domain';
import { INotificationSettingRepo, NOTIFICATION_SETTING_REPO } from '../../i-notification-setting.repo';
import { UpsertNotificationSettingsCommand } from './upsert-notification-settings.command';

@CommandHandlerStrict(UpsertNotificationSettingsCommand)
export class UpsertNotificationSettingsCommandHandler implements ICommandHandler<UpsertNotificationSettingsCommand, NotificationSetting[]> {
  public constructor(
    @Inject(NOTIFICATION_SETTING_REPO) private readonly repo: INotificationSettingRepo,
    @InjectPinoLogger(UpsertNotificationSettingsCommandHandler.name) private readonly logger: PinoLogger,
  ) {}

  public async execute(command: UpsertNotificationSettingsCommand): Promise<NotificationSetting[]> {
    this.logger.info(`Executing ${UpsertNotificationSettingsCommand.name}`);
    return this.repo.upsertManyAsync(command.organizationId, command.items);
  }
}
