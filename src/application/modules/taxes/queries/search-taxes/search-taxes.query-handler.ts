import { Inject } from '@nestjs/common';
import type { IQueryHandler } from '@nestjs/cqrs';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { QueryHandlerStrict, IPageable } from '../../../../../common';
import { TAX_REPO } from '../../../../constants';
import { Tax, TaxFilter } from '../../domain';
import { ITaxRepo } from '../../i-tax.repo';
import { SearchTaxesQuery } from './search-taxes.query';

@QueryHandlerStrict(SearchTaxesQuery)
export class SearchTaxesQueryHandler implements IQueryHandler<SearchTaxesQuery, IPageable<Tax>> {
  constructor(
    @Inject(TAX_REPO) private readonly repo: ITaxRepo,
    @InjectPinoLogger(SearchTaxesQueryHandler.name) private readonly logger: PinoLogger,
  ) {}

  public async execute(query: SearchTaxesQuery): Promise<IPageable<Tax>> {
    this.logger.info(`Executing ${SearchTaxesQuery.name}`);
    const filter = new TaxFilter();
    filter.organizationId = query.organizationId;
    filter.isActive = query.isActive;
    filter.search = query.search;
    filter.page = query.page;
    filter.perPage = query.perPage;
    return this.repo.searchAsync(filter);
  }
}
