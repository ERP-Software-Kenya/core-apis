import { createMap } from '@automapper/core';
import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';
import type { Mapper } from '@automapper/core';
import { NotificationSettingEntity } from '../../../../infrastructure/persistence/entities/notification-setting.entity';
import { NotificationSetting } from '../domain';
import { NotificationSettingResponse } from '../models/responses';
import { NotificationSettingItemRequest, UpsertNotificationSettingsRequest } from '../models/requests';
import { NotificationSettingItem, UpsertNotificationSettingsCommand } from '../commands/upsert-notification-settings';

@Injectable()
export class NotificationSettingProfile extends AutomapperProfile {
  public constructor(@InjectMapper() mapper: Mapper) { super(mapper); }

  public get profile() {
    return (mapper: Mapper) => {
      createMap(mapper, NotificationSettingEntity, NotificationSetting);
      createMap(mapper, NotificationSetting, NotificationSettingEntity);
      createMap(mapper, NotificationSetting, NotificationSettingResponse);
      createMap(mapper, NotificationSettingItemRequest, NotificationSettingItem);
      createMap(mapper, UpsertNotificationSettingsRequest, UpsertNotificationSettingsCommand);
    };
  }
}
