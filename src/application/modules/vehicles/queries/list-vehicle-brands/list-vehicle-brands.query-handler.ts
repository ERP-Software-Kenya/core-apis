import { Inject } from '@nestjs/common';
import type { IQueryHandler } from '@nestjs/cqrs';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { QueryHandlerStrict } from 'src/common';
import { VEHICLE_BRAND_REPO } from 'src/application/constants';
import { IVehicleBrandRepo } from '../../repositories/i-vehicle-brand.repo';
import { VehicleBrand } from '../../domain';
import { ListVehicleBrandsQuery } from './list-vehicle-brands.query';

@QueryHandlerStrict(ListVehicleBrandsQuery)
export class ListVehicleBrandsQueryHandler implements IQueryHandler<ListVehicleBrandsQuery, VehicleBrand[]> {
  public constructor(
    @Inject(VEHICLE_BRAND_REPO) private readonly repo: IVehicleBrandRepo,
    @InjectPinoLogger(ListVehicleBrandsQueryHandler.name) private readonly logger: PinoLogger,
  ) {}

  public async execute(_query: ListVehicleBrandsQuery): Promise<VehicleBrand[]> {
    this.logger.info(`Executing Query '${ListVehicleBrandsQuery.name}'`);
    return this.repo.allAsync();
  }
}
