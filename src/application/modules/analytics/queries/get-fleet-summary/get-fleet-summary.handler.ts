import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { GetFleetSummaryKpisQuery } from './get-fleet-summary.query';
import { Inject } from '@nestjs/common';
import { VEHICLE_REPO } from '../../../../constants';
import { EVehicleStatus } from '../../../../shared';
import { IVehicleRepo } from 'src/application/modules/vehicles';
import { FleetSummaryResponse } from '../../models';

@QueryHandler(GetFleetSummaryKpisQuery)
export class GetFleetSummaryKpisHandler implements IQueryHandler<GetFleetSummaryKpisQuery, FleetSummaryResponse> {
  constructor(@Inject(VEHICLE_REPO) private readonly vehicleRepo: IVehicleRepo) {}

  async execute(): Promise<FleetSummaryResponse> {
    const allVehicles = await this.vehicleRepo.allAsync(); // Assuming allAsync() exists
    
    return {
      totalVehicles: allVehicles.length,
      activeVehicles: allVehicles.filter(v => v.status === EVehicleStatus.Available || v.status === EVehicleStatus.InTransit).length,
      inTransitVehicles: allVehicles.filter(v => v.status === EVehicleStatus.InTransit).length,
      idleVehicles: allVehicles.filter(v => v.status === EVehicleStatus.Idle).length,
      maintenanceVehicles: allVehicles.filter(v => v.status === EVehicleStatus.Maintenance).length,
      availableVehicles: allVehicles.filter(v => v.status === EVehicleStatus.Available).length,
    };
  }
}
