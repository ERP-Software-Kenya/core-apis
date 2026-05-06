import { ApiProperty } from '@nestjs/swagger';

export class CreateNotificationRequest {
  @ApiProperty() public userId: string;
  @ApiProperty() public orgId: string;
  @ApiProperty() public type: string;
  @ApiProperty() public title: string;
  @ApiProperty() public body: string;
}

export class UpdateNotificationRequest {
  @ApiProperty({ required: false }) public readAt?: Date;
}

export class SearchNotificationsRequest {
  @ApiProperty({ required: false }) public userId?: string;
  @ApiProperty({ required: false }) public orgId?: string;
  @ApiProperty({ required: false }) public type?: string;
  @ApiProperty({ required: false, default: 1 }) public $page?: number;
  @ApiProperty({ required: false, default: 20 }) public $perPage?: number;
}

export class ListNotificationsRequest {
  @ApiProperty({ required: false }) public userId?: string;
  @ApiProperty({ required: false }) public orgId?: string;
}
