import { Inject, NotFoundException } from '@nestjs/common';
import { IQueryHandler } from '@nestjs/cqrs';
import { QueryHandlerStrict } from '../../../../../common';
import { PURCHASE_RETURN_REPO } from '../../../../constants';
import { PurchaseReturn } from '../../domain';
import { IPurchaseReturnRepo } from '../../i-purchase-return.repo';
import { GetPurchaseReturnQuery } from './get-purchase-return.query';

@QueryHandlerStrict(GetPurchaseReturnQuery)
export class GetPurchaseReturnQueryHandler implements IQueryHandler<GetPurchaseReturnQuery, PurchaseReturn> {
  constructor(@Inject(PURCHASE_RETURN_REPO) private readonly repo: IPurchaseReturnRepo) {}

  public async execute(query: GetPurchaseReturnQuery): Promise<PurchaseReturn> {
    const ret = await this.repo.getWithItemsAsync(query.id);
    if (!ret) throw new NotFoundException(`Purchase return ${query.id} not found`);
    return ret;
  }
}
