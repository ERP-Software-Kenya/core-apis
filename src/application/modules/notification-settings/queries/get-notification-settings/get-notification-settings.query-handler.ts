import { Inject } from '@nestjs/common';
import { IQueryHandler } from '@nestjs/cqrs';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { QueryHandlerStrict } from '../../../../../common';
import { NotificationSetting } from '../../domain';
import { INotificationSettingRepo, NOTIFICATION_SETTING_REPO } from '../../i-notification-setting.repo';
import { GetNotificationSettingsQuery } from './get-notification-settings.query';

@QueryHandlerStrict(GetNotificationSettingsQuery)
export class GetNotificationSettingsQueryHandler implements IQueryHandler<GetNotificationSettingsQuery, NotificationSetting[]> {
  public constructor(
    @Inject(NOTIFICATION_SETTING_REPO) private readonly repo: INotificationSettingRepo,
    @InjectPinoLogger(GetNotificationSettingsQueryHandler.name) private readonly logger: PinoLogger,
  ) {}

  public async execute(query: GetNotificationSettingsQuery): Promise<NotificationSetting[]> {
    this.logger.info(`Executing ${GetNotificationSettingsQuery.name}`);
    return this.repo.findByOrgAsync(query.organizationId);
  }
}
