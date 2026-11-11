import { AutoMap } from '@automapper/classes';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { ArrayNotEmpty, IsArray, IsBoolean, IsEnum, ValidateNested } from 'class-validator';
import { EActivityAction } from '../../../../../infrastructure/persistence/entities/activity-log.entity';

export class NotificationSettingItemRequest {
  @ApiProperty({ enum: EActivityAction })
  @IsEnum(EActivityAction)
  @AutoMap(() => String)
  public event: EActivityAction;

  @ApiProperty()
  @IsBoolean()
  @AutoMap()
  public isEnabled: boolean;
}

export class UpsertNotificationSettingsRequest {
  @ApiProperty({ type: [NotificationSettingItemRequest] })
  @IsArray()
  @ArrayNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => NotificationSettingItemRequest)
  @AutoMap(() => [NotificationSettingItemRequest])
  public items: NotificationSettingItemRequest[];
}
