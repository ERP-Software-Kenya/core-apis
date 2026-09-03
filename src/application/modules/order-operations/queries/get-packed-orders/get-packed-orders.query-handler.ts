import { Inject } from '@nestjs/common';
import { IQueryHandler } from '@nestjs/cqrs';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { QueryHandlerStrict, IPageable } from '../../../../../common';
import { ORDER_REPO } from '../../../../constants';
import { IOrderRepo, PackedOrderRow } from '../../../orders/i-order.repo';
import { SearchPackedOrdersQuery } from './get-packed-orders.query';

@QueryHandlerStrict(SearchPackedOrdersQuery)
export class SearchPackedOrdersQueryHandler implements IQueryHandler<SearchPackedOrdersQuery, IPageable<PackedOrderRow>> {
  constructor(
    @Inject(ORDER_REPO) private readonly orderRepo: IOrderRepo,
    @InjectPinoLogger(SearchPackedOrdersQueryHandler.name) private readonly logger: PinoLogger,
  ) {}

  public async execute(query: SearchPackedOrdersQuery): Promise<IPageable<PackedOrderRow>> {
    this.logger.info(`Executing ${SearchPackedOrdersQuery.name}`);
    return this.orderRepo.findPackedForDispatchPagedAsync({
      organizationId: query.organizationId,
      search: query.search,
      $page: query.$page ?? 1,
      $perPage: query.$perPage ?? 20,
    });
  }
}
