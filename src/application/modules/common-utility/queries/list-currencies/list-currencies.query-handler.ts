import { Inject } from '@nestjs/common';
import type { IQueryHandler } from '@nestjs/cqrs';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { QueryHandlerStrict, IFilterNormalizer } from '../../../../../common';
import { CURRENCY_REPO } from '../../../../../application/constants';
import { Currency, CurrencyFilter } from '../../domain';
import { ICurrencyRepo } from '../../i-currency.repo';
import { CurrencyFilterNormalizer } from '../../helpers';
import { ListCurrenciesQuery } from './list-currencies.query';

@QueryHandlerStrict(ListCurrenciesQuery)
export class ListCurrenciesQueryHandler implements IQueryHandler<ListCurrenciesQuery, Currency[]> {
  constructor(
    @Inject(CURRENCY_REPO) protected readonly repo: ICurrencyRepo,
    @Inject(CurrencyFilterNormalizer) protected readonly filterNormalizer: IFilterNormalizer<CurrencyFilter, number>,
    @InjectPinoLogger(ListCurrenciesQueryHandler.name) protected readonly logger: PinoLogger,
  ) {}

  public async execute(query: ListCurrenciesQuery): Promise<Currency[]> {
    this.logger.info(`Executing Query "${ListCurrenciesQuery.name}"`);
    const filter = this.filterNormalizer.normalize(query);
    return this.repo.allAsync(filter);
  }
}
