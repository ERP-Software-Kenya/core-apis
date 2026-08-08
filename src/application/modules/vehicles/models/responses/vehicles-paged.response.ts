import { ApiProperty } from '@nestjs/swagger';
import { VehicleResponse } from './vehicle.response';

export class VehiclesPagedResponse {
  @ApiProperty({ type: [VehicleResponse] }) public items: VehicleResponse[];
  @ApiProperty() public page: number;
  @ApiProperty() public perPage: number;
  @ApiProperty() public totalCount: number;
  @ApiProperty() public totalPages: number;
}
