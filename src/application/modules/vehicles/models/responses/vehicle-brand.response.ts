import { ApiProperty } from '@nestjs/swagger';
import { AutoMap } from '@automapper/classes';

export class VehicleBrandResponse {
  @ApiProperty() @AutoMap() public id: string;
  @ApiProperty() @AutoMap() public brandName: string;
}
