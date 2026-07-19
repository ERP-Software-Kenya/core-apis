import { ApiProperty } from '@nestjs/swagger';
import { Driver } from '../../domain';

export class DriversPagedResponse {
  @ApiProperty({ type: [Driver] }) public items: Driver[];
  @ApiProperty() public page: number;
  @ApiProperty() public perPage: number;
  @ApiProperty() public totalCount: number;
  @ApiProperty() public totalPages: number;
}
