import { Inject } from '@nestjs/common';
import type { IQueryHandler } from '@nestjs/cqrs';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { QueryHandlerStrict } from '../../../../../common';
import { IFilterNormalizer, IPageable } from '../../../../../common';
import { PRODUCT_REPO } from '../../../../constants';
import { Product, ProductFilter } from '../../domain';
import { IProductRepo } from '../..';
import { ProductFilterNormalizer } from '../../helpers';
import { SearchProductsQuery } from './search-products.query';

@QueryHandlerStrict(SearchProductsQuery)
export class SearchProductsQueryHandler implements IQueryHandler<SearchProductsQuery, IPageable<Product>> {
  constructor(
    @Inject(PRODUCT_REPO) protected readonly repo: IProductRepo,
    @Inject(ProductFilterNormalizer) protected readonly filterNormalizer: IFilterNormalizer<ProductFilter>,
    @InjectPinoLogger(SearchProductsQueryHandler.name) protected readonly logger: PinoLogger,
  ) {}

  public async execute(query: SearchProductsQuery): Promise<IPageable<Product>> {
    this.logger.info(`Executing Query "${SearchProductsQuery.name}"`);
    const filter = this.filterNormalizer.pageableNormalize(query);
    return this.repo.pagedAsync(filter);
  }
}
