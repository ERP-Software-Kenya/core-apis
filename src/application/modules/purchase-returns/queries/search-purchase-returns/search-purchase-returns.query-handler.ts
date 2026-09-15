import { Inject } from '@nestjs/common';
import { IQueryHandler } from '@nestjs/cqrs';
import { EOrder, IPageable, QueryHandlerStrict } from '../../../../../common';
import { PURCHASE_RETURN_REPO } from '../../../../constants';
import { PurchaseReturn } from '../../domain';
import { IPurchaseReturnRepo } from '../../i-purchase-return.repo';
import { SearchPurchaseReturnsQuery } from './search-purchase-returns.query';

@QueryHandlerStrict(SearchPurchaseReturnsQuery)
export class SearchPurchaseReturnsQueryHandler implements IQueryHandler<SearchPurchaseReturnsQuery, IPageable<PurchaseReturn>> {
  constructor(@Inject(PURCHASE_RETURN_REPO) private readonly repo: IPurchaseReturnRepo) {}

  public execute(query: SearchPurchaseReturnsQuery): Promise<IPageable<PurchaseReturn>> {
    query.$page ??= 1;
    query.$perPage ??= 20;
    query.$orderBy ??= 'createdAt';
    query.$order ??= EOrder.Desc;
    return this.repo.pagedAsync(query);
  }
}
