import { Inject } from '@nestjs/common';
import type { IQueryHandler } from '@nestjs/cqrs';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { QueryHandlerStrict } from '../../../../../common';
import { IFilterNormalizer, IPageable } from '../../../../../common';
import { PURCHASE_ORDER_REPO } from '../../../../constants';
import { PurchaseOrder, PurchaseOrderFilter } from '../../domain';
import { IPurchaseOrderRepo } from '../..';
import { PurchaseOrderFilterNormalizer } from '../../helpers';
import { SearchPurchaseOrdersQuery } from './search-purchase-orders.query';

@QueryHandlerStrict(SearchPurchaseOrdersQuery)
export class SearchPurchaseOrdersQueryHandler implements IQueryHandler<SearchPurchaseOrdersQuery, IPageable<PurchaseOrder>> {
  constructor(
    @Inject(PURCHASE_ORDER_REPO) protected readonly repo: IPurchaseOrderRepo,
    @Inject(PurchaseOrderFilterNormalizer) protected readonly filterNormalizer: IFilterNormalizer<PurchaseOrderFilter>,
    @InjectPinoLogger(SearchPurchaseOrdersQueryHandler.name) protected readonly logger: PinoLogger,
  ) {}

  public async execute(query: SearchPurchaseOrdersQuery): Promise<IPageable<PurchaseOrder>> {
    this.logger.info(`Executing Query "${SearchPurchaseOrdersQuery.name}"`);
    const filter = this.filterNormalizer.pageableNormalize(query);
    return this.repo.pagedAsync(filter);
  }
}
