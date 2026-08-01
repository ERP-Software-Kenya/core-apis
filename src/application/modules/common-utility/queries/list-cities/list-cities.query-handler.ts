import { Inject } from '@nestjs/common';
import type { IQueryHandler } from '@nestjs/cqrs';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { QueryHandlerStrict, IFilterNormalizer } from '../../../../../common';
import { CITY_REPO } from '../../../../../application/constants';
import { City, CityFilter } from '../../domain';
import { ICityRepo } from '../../i-city.repo';
import { CityFilterNormalizer } from '../../helpers';
import { ListCitiesQuery } from './list-cities.query';

@QueryHandlerStrict(ListCitiesQuery)
export class ListCitiesQueryHandler implements IQueryHandler<ListCitiesQuery, City[]> {
  constructor(
    @Inject(CITY_REPO) protected readonly repo: ICityRepo,
    @Inject(CityFilterNormalizer) protected readonly filterNormalizer: IFilterNormalizer<CityFilter, number>,
    @InjectPinoLogger(ListCitiesQueryHandler.name) protected readonly logger: PinoLogger,
  ) {}

  public async execute(query: ListCitiesQuery): Promise<City[]> {
    this.logger.info(`Executing Query "${ListCitiesQuery.name}"`);
    const filter = this.filterNormalizer.normalize(query);
    return this.repo.allAsync(filter);
  }
}
