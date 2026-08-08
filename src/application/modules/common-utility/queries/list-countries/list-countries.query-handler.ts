import { Inject } from '@nestjs/common';
import type { IQueryHandler } from '@nestjs/cqrs';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { QueryHandlerStrict, IFilterNormalizer } from '../../../../../common';
import { COUNTRY_REPO } from '../../../../../application/constants';
import { Country, CountryFilter } from '../../domain';
import { ICountryRepo } from '../../i-country.repo';
import { CountryFilterNormalizer } from '../../helpers';
import { ListCountriesQuery } from './list-countries.query';

@QueryHandlerStrict(ListCountriesQuery)
export class ListCountriesQueryHandler implements IQueryHandler<ListCountriesQuery, Country[]> {
  constructor(
    @Inject(COUNTRY_REPO) protected readonly repo: ICountryRepo,
    @Inject(CountryFilterNormalizer) protected readonly filterNormalizer: IFilterNormalizer<CountryFilter, number>,
    @InjectPinoLogger(ListCountriesQueryHandler.name) protected readonly logger: PinoLogger,
  ) {}

  public async execute(query: ListCountriesQuery): Promise<Country[]> {
    this.logger.info(`Executing Query "${ListCountriesQuery.name}"`);
    const filter = this.filterNormalizer.normalize(query);
    return this.repo.allAsync(filter);
  }
}
