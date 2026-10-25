import { AutoMap } from '@automapper/classes';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { EActivityAction } from '../../../../../infrastructure/persistence/entities/activity-log.entity';

export class NotificationSettingResponse {
  @ApiProperty() @AutoMap() public id: string;
  @ApiProperty() @AutoMap() public organizationId: string;
  @ApiProperty({ enum: EActivityAction }) @AutoMap(() => String) public event: EActivityAction;
  @ApiProperty() @AutoMap() public isEnabled: boolean;
  @ApiProperty() @AutoMap(() => Date) public createdAt: Date;
  @ApiPropertyOptional() @AutoMap(() => Date) public updatedAt?: Date;
}
