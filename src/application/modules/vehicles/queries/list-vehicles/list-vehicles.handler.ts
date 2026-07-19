import { Inject } from '@nestjs/common';
import { IQueryHandler } from '@nestjs/cqrs';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { QueryHandlerStrict, IFilterNormalizer } from 'src/common';
import { VEHICLE_REPO } from 'src/application/constants';
import { IVehicleRepo } from '../../repositories/i-vehicle.repo';
import { VehicleFilterNormalizer } from '../../helpers';
import { ListVehiclesQuery } from './list-vehicles.query';
import { Vehicle } from '../../domain';
import { VehicleFilter } from '../../domain';

@QueryHandlerStrict(ListVehiclesQuery)
export class ListVehiclesHandler implements IQueryHandler<ListVehiclesQuery, Vehicle[]> {
  constructor(
    @Inject(VEHICLE_REPO) protected readonly repo: IVehicleRepo,
    @Inject(VehicleFilterNormalizer) protected readonly filterNormalizer: IFilterNormalizer<VehicleFilter>,
    @InjectPinoLogger(ListVehiclesHandler.name) protected readonly logger: PinoLogger,
  ) {}

  public async execute(query: ListVehiclesQuery): Promise<Vehicle[]> {
    this.logger.info(`Executing Query "${ListVehiclesQuery.name}"`);
    const filter = this.filterNormalizer.normalize(query);
    return this.repo.allAsync(filter);
  }
}
