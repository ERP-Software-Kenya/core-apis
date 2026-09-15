import { Inject } from '@nestjs/common';
import { IQueryHandler } from '@nestjs/cqrs';
import { EOrder, QueryHandlerStrict } from '../../../../../common';
import { SALES_RETURN_REPO } from '../../../../constants';
import { SalesReturn } from '../../domain';
import { ISalesReturnRepo } from '../../i-sales-return.repo';
import { ListSalesReturnsQuery } from './list-sales-returns.query';

@QueryHandlerStrict(ListSalesReturnsQuery)
export class ListSalesReturnsQueryHandler implements IQueryHandler<ListSalesReturnsQuery, SalesReturn[]> {
  constructor(@Inject(SALES_RETURN_REPO) private readonly repo: ISalesReturnRepo) {}

  public execute(query: ListSalesReturnsQuery): Promise<SalesReturn[]> {
    query.$orderBy ??= 'createdAt';
    query.$order ??= EOrder.Desc;
    return this.repo.allAsync(query);
  }
}
