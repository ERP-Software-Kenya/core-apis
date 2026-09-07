import { Inject } from '@nestjs/common';
import { IQueryHandler } from '@nestjs/cqrs';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { QueryHandlerStrict, IPageable } from '../../../../../common';
import { ORDER_REPO } from '../../../../constants';
import { IOrderRepo, PackedOrderRow } from '../../../orders/i-order.repo';
import { SearchReadyForPickupQuery } from './get-ready-for-pickup.query';

@QueryHandlerStrict(SearchReadyForPickupQuery)
export class SearchReadyForPickupQueryHandler implements IQueryHandler<SearchReadyForPickupQuery, IPageable<PackedOrderRow>> {
  constructor(
    @Inject(ORDER_REPO) private readonly orderRepo: IOrderRepo,
    @InjectPinoLogger(SearchReadyForPickupQueryHandler.name) private readonly logger: PinoLogger,
  ) {}

  public async execute(query: SearchReadyForPickupQuery): Promise<IPageable<PackedOrderRow>> {
    this.logger.info(`Executing ${SearchReadyForPickupQuery.name}`);
    return this.orderRepo.findReadyForPickupPagedAsync({
      organizationId: query.organizationId,
      locationId: query.locationId,
      search: query.search,
      $page: query.$page ?? 1,
      $perPage: query.$perPage ?? 20,
    });
  }
}
