import { Inject } from '@nestjs/common';
import { IQueryHandler } from '@nestjs/cqrs';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { IPageable, QueryHandlerStrict } from '../../../../../common';
import { PRODUCT_BRANCH_PRICE_REPO, IProductBranchPriceRepo } from '../../i-product-branch-price.repo';
import { ProductBranchPrice } from '../../domain';
import { ListBranchProductPricesQuery } from './list-branch-product-prices.query';

@QueryHandlerStrict(ListBranchProductPricesQuery)
export class ListBranchProductPricesQueryHandler
  implements IQueryHandler<ListBranchProductPricesQuery, IPageable<ProductBranchPrice>>
{
  constructor(
    @Inject(PRODUCT_BRANCH_PRICE_REPO) private readonly repo: IProductBranchPriceRepo,
    @InjectPinoLogger(ListBranchProductPricesQueryHandler.name) private readonly logger: PinoLogger,
  ) {}

  public async execute(query: ListBranchProductPricesQuery): Promise<IPageable<ProductBranchPrice>> {
    this.logger.info(`Executing ${ListBranchProductPricesQuery.name} branchId=${query.branchId}`);
    return this.repo.listByBranchAsync(
      query.branchId,
      query.organizationId,
      query.page,
      query.perPage,
      query.search,
    );
  }
}
