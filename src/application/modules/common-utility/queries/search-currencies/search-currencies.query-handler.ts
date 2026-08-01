import { Inject } from '@nestjs/common';
import type { IQueryHandler } from '@nestjs/cqrs';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { QueryHandlerStrict, IFilterNormalizer, IPageable } from '../../../../../common';
import { CURRENCY_REPO } from '../../../../../application/constants';
import { Currency, CurrencyFilter } from '../../domain';
import { ICurrencyRepo } from '../../i-currency.repo';
import { CurrencyFilterNormalizer } from '../../helpers';
import { SearchCurrenciesQuery } from './search-currencies.query';

@QueryHandlerStrict(SearchCurrenciesQuery)
export class SearchCurrenciesQueryHandler implements IQueryHandler<SearchCurrenciesQuery, IPageable<Currency>> {
  constructor(
    @Inject(CURRENCY_REPO) protected readonly repo: ICurrencyRepo,
    @Inject(CurrencyFilterNormalizer) protected readonly filterNormalizer: IFilterNormalizer<CurrencyFilter, number>,
    @InjectPinoLogger(SearchCurrenciesQueryHandler.name) protected readonly logger: PinoLogger,
  ) {}

  public async execute(query: SearchCurrenciesQuery): Promise<IPageable<Currency>> {
    this.logger.info(`Executing Query "${SearchCurrenciesQuery.name}"`);
    const filter = this.filterNormalizer.pageableNormalize(query);
    return this.repo.pagedAsync(filter);
  }
}
