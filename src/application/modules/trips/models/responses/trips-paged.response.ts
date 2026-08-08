import { ApiProperty } from '@nestjs/swagger';
import { CreateTripResponse } from './create-trip.response';

export class TripsPagedResponse {
  @ApiProperty({ type: [CreateTripResponse] }) public items: CreateTripResponse[];
  @ApiProperty() public page: number;
  @ApiProperty() public perPage: number;
  @ApiProperty() public totalCount: number;
  @ApiProperty() public totalPages: number;
}
