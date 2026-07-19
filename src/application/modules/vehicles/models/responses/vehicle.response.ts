import { ApiProperty } from '@nestjs/swagger';
import { AutoMap } from '@automapper/classes';

export class VehicleResponse {
  @ApiProperty()
  @AutoMap()
  public id: string;

  @ApiProperty()
  @AutoMap()
  public vehicleNumber: string;
}
