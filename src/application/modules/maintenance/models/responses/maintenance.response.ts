import { ApiProperty } from '@nestjs/swagger';
import { AutoMap } from '@automapper/classes';

export class MaintenanceResponse {
  @ApiProperty()
  @AutoMap()
  public id: string;

  @ApiProperty()
  @AutoMap()
  public vehicleId: string;

  @ApiProperty()
  @AutoMap()
  public serviceCenter: string;
}
