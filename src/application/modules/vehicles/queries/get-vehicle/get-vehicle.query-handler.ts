import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { GetVehicleQuery } from './get-vehicle.query';
import { Inject, NotFoundException } from '@nestjs/common';
import { VEHICLE_REPO } from '../../../../constants';
import { IVehicleRepo } from '../../repositories/i-vehicle.repo';
import { Vehicle } from '../../domain';

@QueryHandler(GetVehicleQuery)
export class GetVehicleHandler implements IQueryHandler<GetVehicleQuery, Vehicle> {
  constructor(@Inject(VEHICLE_REPO) private readonly vehicleRepo: IVehicleRepo) {}

  async execute(query: GetVehicleQuery): Promise<Vehicle> {
    const vehicle = await this.vehicleRepo.getAsync(query.id);
    if (!vehicle) {
      throw new NotFoundException(`Vehicle with ID ${query.id} not found`);
    }
    return vehicle;
  }
}
