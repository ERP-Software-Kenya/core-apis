import { Inject } from '@nestjs/common';
import type { IQueryHandler } from '@nestjs/cqrs';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { QueryHandlerStrict } from 'src/common';
import { FUEL_TYPE_REPO } from 'src/application/constants';
import { IFuelTypeRepo } from '../../repositories/i-fuel-type.repo';
import { FuelType } from '../../domain';
import { ListFuelTypesQuery } from './list-fuel-types.query';

@QueryHandlerStrict(ListFuelTypesQuery)
export class ListFuelTypesQueryHandler implements IQueryHandler<ListFuelTypesQuery, FuelType[]> {
  public constructor(
    @Inject(FUEL_TYPE_REPO) private readonly repo: IFuelTypeRepo,
    @InjectPinoLogger(ListFuelTypesQueryHandler.name) private readonly logger: PinoLogger,
  ) {}

  public async execute(_query: ListFuelTypesQuery): Promise<FuelType[]> {
    this.logger.info(`Executing Query '${ListFuelTypesQuery.name}'`);
    return this.repo.allAsync();
  }
}
