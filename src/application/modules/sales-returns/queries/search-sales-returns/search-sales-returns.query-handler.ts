import { Inject } from '@nestjs/common';
import { IQueryHandler } from '@nestjs/cqrs';
import { EOrder, IPageable, QueryHandlerStrict } from '../../../../../common';
import { SALES_RETURN_REPO } from '../../../../constants';
import { SalesReturn } from '../../domain';
import { ISalesReturnRepo } from '../../i-sales-return.repo';
import { SearchSalesReturnsQuery } from './search-sales-returns.query';

@QueryHandlerStrict(SearchSalesReturnsQuery)
export class SearchSalesReturnsQueryHandler implements IQueryHandler<SearchSalesReturnsQuery, IPageable<SalesReturn>> {
  constructor(@Inject(SALES_RETURN_REPO) private readonly repo: ISalesReturnRepo) {}

  public execute(query: SearchSalesReturnsQuery): Promise<IPageable<SalesReturn>> {
    query.$page ??= 1;
    query.$perPage ??= 20;
    query.$orderBy ??= 'createdAt';
    query.$order ??= EOrder.Desc;
    return this.repo.pagedAsync(query);
  }
}
