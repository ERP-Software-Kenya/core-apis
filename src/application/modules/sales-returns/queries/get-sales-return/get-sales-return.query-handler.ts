import { Inject, NotFoundException } from '@nestjs/common';
import { IQueryHandler } from '@nestjs/cqrs';
import { QueryHandlerStrict } from '../../../../../common';
import { SALES_RETURN_REPO } from '../../../../constants';
import { SalesReturn } from '../../domain';
import { ISalesReturnRepo } from '../../i-sales-return.repo';
import { GetSalesReturnQuery } from './get-sales-return.query';

@QueryHandlerStrict(GetSalesReturnQuery)
export class GetSalesReturnQueryHandler implements IQueryHandler<GetSalesReturnQuery, SalesReturn> {
  constructor(@Inject(SALES_RETURN_REPO) private readonly repo: ISalesReturnRepo) {}

  public async execute(query: GetSalesReturnQuery): Promise<SalesReturn> {
    const ret = await this.repo.getWithItemsAsync(query.id);
    if (!ret) throw new NotFoundException(`Sales return ${query.id} not found`);
    return ret;
  }
}
