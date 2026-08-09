import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { AutoMap } from '@automapper/classes';

export class VehicleTypeResponse {
  @ApiProperty() @AutoMap() public id: string;
  @ApiProperty() @AutoMap() public name: string;
  @ApiPropertyOptional() @AutoMap() public description?: string;
}
