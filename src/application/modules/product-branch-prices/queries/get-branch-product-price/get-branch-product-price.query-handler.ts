import { Inject } from '@nestjs/common';
import { IQueryHandler } from '@nestjs/cqrs';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { QueryHandlerStrict } from '../../../../../common';
import { PRODUCT_BRANCH_PRICE_REPO, IProductBranchPriceRepo } from '../../i-product-branch-price.repo';
import { ProductBranchPrice } from '../../domain';
import { GetBranchProductPriceQuery } from './get-branch-product-price.query';

@QueryHandlerStrict(GetBranchProductPriceQuery)
export class GetBranchProductPriceQueryHandler
  implements IQueryHandler<GetBranchProductPriceQuery, ProductBranchPrice | null>
{
  constructor(
    @Inject(PRODUCT_BRANCH_PRICE_REPO) private readonly repo: IProductBranchPriceRepo,
    @InjectPinoLogger(GetBranchProductPriceQueryHandler.name) private readonly logger: PinoLogger,
  ) {}

  public async execute(query: GetBranchProductPriceQuery): Promise<ProductBranchPrice | null> {
    this.logger.info(`Executing ${GetBranchProductPriceQuery.name} branchId=${query.branchId} productId=${query.productId}`);
    return this.repo.getByBranchAndProductAsync(query.branchId, query.productId);
  }
}
