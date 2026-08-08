import { ApiProperty } from '@nestjs/swagger';
import { DriverResponse } from './driver.response';

export class DriversPagedResponse {
  @ApiProperty({ type: [DriverResponse] }) public items: DriverResponse[];
  @ApiProperty() public page: number;
  @ApiProperty() public perPage: number;
  @ApiProperty() public totalCount: number;
  @ApiProperty() public totalPages: number;
}
