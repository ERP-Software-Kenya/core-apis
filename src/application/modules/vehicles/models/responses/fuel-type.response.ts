import { ApiProperty } from '@nestjs/swagger';
import { AutoMap } from '@automapper/classes';

export class FuelTypeResponse {
  @ApiProperty() @AutoMap() public id: string;
  @ApiProperty() @AutoMap() public name: string;
}
