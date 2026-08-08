import { AutoMap } from '@automapper/classes';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateTripResponse {
  @ApiProperty() @AutoMap() public id: string;
  @ApiProperty() @AutoMap() public tripNumber: string;
  @ApiProperty() @AutoMap() public vehicleId: string;
  @ApiProperty() @AutoMap() public driverId: string;
  @ApiProperty() @AutoMap() public customerId: string;
  @ApiProperty() @AutoMap() public pickupLocation: string;
  @ApiProperty() @AutoMap() public dropLocation: string;
  @ApiProperty() @AutoMap() public startDatetime: Date;
  @ApiPropertyOptional() @AutoMap() public endDatetime?: Date;
  @ApiPropertyOptional() @AutoMap() public estimatedDistance?: number;
  @ApiPropertyOptional() @AutoMap() public actualDistance?: number;
  @ApiProperty() @AutoMap() public tripStatus: string;
  @ApiProperty() @AutoMap() public priority: string;
}
