import { Inject } from '@nestjs/common';
import { IQueryHandler } from '@nestjs/cqrs';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { QueryHandlerStrict, IPageable } from '../../../../../common';
import { ORDER_REPO } from '../../../../constants';
import { Order } from '../../domain';
import { IOrderRepo } from '../..';
import { SearchOrdersQuery } from './search-orders.query';

@QueryHandlerStrict(SearchOrdersQuery)
export class SearchOrdersQueryHandler implements IQueryHandler<SearchOrdersQuery, IPageable<Order>> {
  constructor(
    @Inject(ORDER_REPO) private readonly repo: IOrderRepo,
    @InjectPinoLogger(SearchOrdersQueryHandler.name) private readonly logger: PinoLogger,
  ) {}

  public async execute(query: SearchOrdersQuery): Promise<IPageable<Order>> {
    this.logger.info(`Executing ${SearchOrdersQuery.name}`);
    query.$page = query.$page ?? 1;
    query.$perPage = query.$perPage ?? 20;
    return this.repo.searchPagedAsync(query);
  }
}
