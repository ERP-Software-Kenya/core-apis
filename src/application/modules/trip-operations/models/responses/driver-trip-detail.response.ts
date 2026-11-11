import { ApiProperty } from '@nestjs/swagger';

export class DriverTripStopResponse {
  @ApiProperty() public stopId: string;
  @ApiProperty() public sequence: number;
  @ApiProperty() public customerName: string;
  @ApiProperty() public customerEmail: string;
  @ApiProperty() public address: string;
  @ApiProperty() public latitude: number;
  @ApiProperty() public longitude: number;
  @ApiProperty() public status: string;
}

export class DriverTripDetailResponse {
  @ApiProperty() public id: string;
  @ApiProperty() public tripNumber: string;
  @ApiProperty() public vehiclePlate: string;
  @ApiProperty() public status: string;
  @ApiProperty({ type: [DriverTripStopResponse] }) public stops: DriverTripStopResponse[];
  @ApiProperty() public stopCount: number;
  @ApiProperty() public deliveredCount: number;
  @ApiProperty() public createdAt: Date;
}
