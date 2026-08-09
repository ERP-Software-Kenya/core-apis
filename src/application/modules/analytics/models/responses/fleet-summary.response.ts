import { ApiProperty } from '@nestjs/swagger';

export class FleetSummaryResponse {
  @ApiProperty()
  totalVehicles: number;

  @ApiProperty()
  activeVehicles: number;

  @ApiProperty()
  inTransitVehicles: number;

  @ApiProperty()
  idleVehicles: number;

  @ApiProperty()
  maintenanceVehicles: number;

  @ApiProperty()
  availableVehicles: number;
}
