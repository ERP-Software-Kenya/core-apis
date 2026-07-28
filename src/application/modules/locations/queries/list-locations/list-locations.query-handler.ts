import { Inject } from '@nestjs/common';
import type { IQueryHandler } from '@nestjs/cqrs';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { IFilterNormalizer, QueryHandlerStrict } from 'src/common';
import { LOCATION_REPO } from '../../../../constants';
import { Location, LocationFilter } from '../../domain';
import { ILocationRepo } from '../../i-location.repo';
import { LocationFilterNormalizer } from '../../helpers';
import { ListLocationsQuery } from './list-locations.query';

@QueryHandlerStrict(ListLocationsQuery)
export class ListLocationsQueryHandler implements IQueryHandler<ListLocationsQuery, Location[]> {
  constructor(
    @Inject(LOCATION_REPO) private readonly repo: ILocationRepo,
    @Inject(LocationFilterNormalizer) private readonly filterNormalizer: IFilterNormalizer<LocationFilter>,
    @InjectPinoLogger(ListLocationsQueryHandler.name) private readonly logger: PinoLogger,
  ) {}

  public async execute(query: ListLocationsQuery): Promise<Location[]> {
    this.logger.info(`Executing ${ListLocationsQuery.name}`);
    const filter = this.filterNormalizer.normalize(query);
    return this.repo.allAsync(filter);
  }
}
