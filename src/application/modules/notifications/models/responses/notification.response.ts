import { AutoMap } from '@automapper/classes';
import { ApiProperty } from '@nestjs/swagger';

export class NotificationResponse {
  @AutoMap() @ApiProperty() public id: string;
  @AutoMap() @ApiProperty() public userId: string;
  @AutoMap() @ApiProperty() public orgId: string;
  @AutoMap() @ApiProperty() public type: string;
  @AutoMap() @ApiProperty() public title: string;
  @AutoMap() @ApiProperty() public body: string;
  @AutoMap() @ApiProperty() public readAt?: Date;
  @AutoMap() @ApiProperty() public createdAt: Date;
}

export class NotificationsPagedResponse {
  @ApiProperty({ type: [NotificationResponse] }) public items: NotificationResponse[];
  @ApiProperty() public page: number;
  @ApiProperty() public perPage: number;
  @ApiProperty() public totalCount: number;
  @ApiProperty() public totalPages: number;
}
