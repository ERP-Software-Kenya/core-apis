import { Inject } from '@nestjs/common';
import type { IQueryHandler } from '@nestjs/cqrs';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { IFilterNormalizer, IPageable, QueryHandlerStrict } from 'src/common';
import { LOCATION_REPO } from '../../../../constants';
import { Location, LocationFilter } from '../../domain';
import { ILocationRepo } from '../../i-location.repo';
import { LocationFilterNormalizer } from '../../helpers';
import { SearchLocationsQuery } from './search-locations.query';

@QueryHandlerStrict(SearchLocationsQuery)
export class SearchLocationsQueryHandler implements IQueryHandler<SearchLocationsQuery, IPageable<Location>> {
  constructor(
    @Inject(LOCATION_REPO) private readonly repo: ILocationRepo,
    @Inject(LocationFilterNormalizer) private readonly filterNormalizer: IFilterNormalizer<LocationFilter>,
    @InjectPinoLogger(SearchLocationsQueryHandler.name) private readonly logger: PinoLogger,
  ) {}

  public async execute(query: SearchLocationsQuery): Promise<IPageable<Location>> {
    this.logger.info(`Executing ${SearchLocationsQuery.name}`);
    const filter = this.filterNormalizer.pageableNormalize(query);
    return this.repo.pagedAsync(filter);
  }
}
