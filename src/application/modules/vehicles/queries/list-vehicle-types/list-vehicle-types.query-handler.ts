import { Inject } from '@nestjs/common';
import type { IQueryHandler } from '@nestjs/cqrs';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { QueryHandlerStrict } from 'src/common';
import { VEHICLE_TYPE_REPO } from 'src/application/constants';
import { IVehicleTypeRepo } from '../../repositories/i-vehicle-type.repo';
import { VehicleType } from '../../domain';
import { ListVehicleTypesQuery } from './list-vehicle-types.query';

@QueryHandlerStrict(ListVehicleTypesQuery)
export class ListVehicleTypesQueryHandler implements IQueryHandler<ListVehicleTypesQuery, VehicleType[]> {
  public constructor(
    @Inject(VEHICLE_TYPE_REPO) private readonly repo: IVehicleTypeRepo,
    @InjectPinoLogger(ListVehicleTypesQueryHandler.name) private readonly logger: PinoLogger,
  ) {}

  public async execute(_query: ListVehicleTypesQuery): Promise<VehicleType[]> {
    this.logger.info(`Executing Query '${ListVehicleTypesQuery.name}'`);
    return this.repo.allAsync();
  }
}
