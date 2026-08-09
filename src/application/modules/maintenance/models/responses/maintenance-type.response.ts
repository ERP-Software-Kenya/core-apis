import { ApiProperty } from '@nestjs/swagger';
import { AutoMap } from '@automapper/classes';

export class MaintenanceTypeResponse {
  @ApiProperty() @AutoMap() public id: string;
  @ApiProperty() @AutoMap() public name: string;
}
