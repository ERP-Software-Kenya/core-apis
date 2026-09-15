import { Inject } from '@nestjs/common';
import { IQueryHandler } from '@nestjs/cqrs';
import { EOrder, QueryHandlerStrict } from '../../../../../common';
import { PURCHASE_RETURN_REPO } from '../../../../constants';
import { PurchaseReturn } from '../../domain';
import { IPurchaseReturnRepo } from '../../i-purchase-return.repo';
import { ListPurchaseReturnsQuery } from './list-purchase-returns.query';

@QueryHandlerStrict(ListPurchaseReturnsQuery)
export class ListPurchaseReturnsQueryHandler implements IQueryHandler<ListPurchaseReturnsQuery, PurchaseReturn[]> {
  constructor(@Inject(PURCHASE_RETURN_REPO) private readonly repo: IPurchaseReturnRepo) {}

  public execute(query: ListPurchaseReturnsQuery): Promise<PurchaseReturn[]> {
    query.$orderBy ??= 'createdAt';
    query.$order ??= EOrder.Desc;
    return this.repo.allAsync(query);
  }
}
