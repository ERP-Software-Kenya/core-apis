import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { SharedModule } from '../../shared';
import { NotificationSettingsController } from './notification-settings.controller';
import { NotificationSettingCommandHandlers } from './commands';
import { NotificationSettingQueryHandlers } from './queries';
import { NotificationSettingProfile } from './mapper';

@Module({
  imports:     [CqrsModule, SharedModule],
  controllers: [NotificationSettingsController],
  providers:   [
    ...NotificationSettingCommandHandlers,
    ...NotificationSettingQueryHandlers,
    NotificationSettingProfile,
  ],
})
export class NotificationSettingsModule {}
