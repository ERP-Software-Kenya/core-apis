import { Inject } from '@nestjs/common';
import type { IQueryHandler } from '@nestjs/cqrs';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { QueryHandlerStrict } from '../../../../../common';
import { IFilterNormalizer } from '../../../../../common';
import { PRODUCT_REPO } from '../../../../constants';
import { Product, ProductFilter } from '../../domain';
import { IProductRepo } from '../..';
import { ProductFilterNormalizer } from '../../helpers';
import { ListProductsQuery } from './list-products.query';

@QueryHandlerStrict(ListProductsQuery)
export class ListProductsQueryHandler implements IQueryHandler<ListProductsQuery, Product[]> {
  constructor(
    @Inject(PRODUCT_REPO) protected readonly repo: IProductRepo,
    @Inject(ProductFilterNormalizer) protected readonly filterNormalizer: IFilterNormalizer<ProductFilter>,
    @InjectPinoLogger(ListProductsQueryHandler.name) protected readonly logger: PinoLogger,
  ) {}

  public async execute(query: ListProductsQuery): Promise<Product[]> {
    this.logger.info(`Executing Query "${ListProductsQuery.name}"`);
    const filter = this.filterNormalizer.normalize(query);
    return this.repo.allAsync(filter);
  }
}
