import { Inject } from '@nestjs/common';
import type { IQueryHandler } from '@nestjs/cqrs';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { QueryHandlerStrict, IFilterNormalizer, IPageable } from '../../../../../common';
import { CITY_REPO } from '../../../../../application/constants';
import { City, CityFilter } from '../../domain';
import { ICityRepo } from '../../i-city.repo';
import { CityFilterNormalizer } from '../../helpers';
import { SearchCitiesQuery } from './search-cities.query';

@QueryHandlerStrict(SearchCitiesQuery)
export class SearchCitiesQueryHandler implements IQueryHandler<SearchCitiesQuery, IPageable<City>> {
  constructor(
    @Inject(CITY_REPO) protected readonly repo: ICityRepo,
    @Inject(CityFilterNormalizer) protected readonly filterNormalizer: IFilterNormalizer<CityFilter, number>,
    @InjectPinoLogger(SearchCitiesQueryHandler.name) protected readonly logger: PinoLogger,
  ) {}

  public async execute(query: SearchCitiesQuery): Promise<IPageable<City>> {
    this.logger.info(`Executing Query "${SearchCitiesQuery.name}"`);
    const filter = this.filterNormalizer.pageableNormalize(query);
    return this.repo.pagedAsync(filter);
  }
}
