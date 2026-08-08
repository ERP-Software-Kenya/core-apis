import { IQueryHandler } from '@nestjs/cqrs';
import { Inject, NotFoundException } from '@nestjs/common';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { QueryHandlerStrict } from '../../../../common';
import { VEHICLE_REPO } from '../../../../constants';
import { IVehicleRepo } from '../../repositories/i-vehicle.repo';
import { Vehicle } from '../../domain';
import { GetVehicleQuery } from './get-vehicle.query';

@QueryHandlerStrict(GetVehicleQuery)
export class GetVehicleHandler implements IQueryHandler<GetVehicleQuery, Vehicle> {
  public constructor(
    @Inject(VEHICLE_REPO) private readonly vehicleRepo: IVehicleRepo,
    @InjectPinoLogger(GetVehicleHandler.name) private readonly logger: PinoLogger,
  ) {}

  public async execute(query: GetVehicleQuery): Promise<Vehicle> {
    this.logger.info(`Executing Query '${GetVehicleQuery.name}'`);
    const vehicle = await this.vehicleRepo.getAsync(query.id);
    if (!vehicle) {
      throw new NotFoundException(`Vehicle with ID ${query.id} not found`);
    }
    return vehicle;
  }
}
