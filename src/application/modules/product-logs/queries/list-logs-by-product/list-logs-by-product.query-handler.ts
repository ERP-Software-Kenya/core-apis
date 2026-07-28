import { Inject } from '@nestjs/common';
import type { IQueryHandler } from '@nestjs/cqrs';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { EOrder, IPageable, QueryHandlerStrict } from 'src/common';
import { PRODUCT_LOG_REPO } from '../../../../constants';
import { ProductLog } from '../../domain';
import { IProductLogRepo } from '../../i-product-log.repo';
import { ListLogsByProductQuery } from './list-logs-by-product.query';

@QueryHandlerStrict(ListLogsByProductQuery)
export class ListLogsByProductQueryHandler implements IQueryHandler<ListLogsByProductQuery, IPageable<ProductLog>> {
  constructor(
    @Inject(PRODUCT_LOG_REPO) private readonly repo: IProductLogRepo,
    @InjectPinoLogger(ListLogsByProductQueryHandler.name) private readonly logger: PinoLogger,
  ) {}

  public async execute(query: ListLogsByProductQuery): Promise<IPageable<ProductLog>> {
    this.logger.info(`Executing ${ListLogsByProductQuery.name} productId=${query.productId}`);
    const filter = { ...query, $page: query.$page ?? 1, $perPage: query.$perPage ?? 20, $orderBy: 'createdAt', $order: EOrder.Desc };
    return this.repo.pagedAsync(filter);
  }
}
