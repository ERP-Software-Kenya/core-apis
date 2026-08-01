import { Inject } from '@nestjs/common';
import type { IQueryHandler } from '@nestjs/cqrs';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { QueryHandlerStrict, IFilterNormalizer, IPageable } from '../../../../../common';
import { COUNTRY_REPO } from '../../../../../application/constants';
import { Country, CountryFilter } from '../../domain';
import { ICountryRepo } from '../../i-country.repo';
import { CountryFilterNormalizer } from '../../helpers';
import { SearchCountriesQuery } from './search-countries.query';

@QueryHandlerStrict(SearchCountriesQuery)
export class SearchCountriesQueryHandler implements IQueryHandler<SearchCountriesQuery, IPageable<Country>> {
  constructor(
    @Inject(COUNTRY_REPO) protected readonly repo: ICountryRepo,
    @Inject(CountryFilterNormalizer) protected readonly filterNormalizer: IFilterNormalizer<CountryFilter, number>,
    @InjectPinoLogger(SearchCountriesQueryHandler.name) protected readonly logger: PinoLogger,
  ) {}

  public async execute(query: SearchCountriesQuery): Promise<IPageable<Country>> {
    this.logger.info(`Executing Query "${SearchCountriesQuery.name}"`);
    const filter = this.filterNormalizer.pageableNormalize(query);
    return this.repo.pagedAsync(filter);
  }
}
