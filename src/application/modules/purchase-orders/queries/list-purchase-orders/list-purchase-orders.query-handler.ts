import { Inject } from '@nestjs/common';
import type { IQueryHandler } from '@nestjs/cqrs';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { QueryHandlerStrict } from '../../../../../common';
import { IFilterNormalizer } from '../../../../../common';
import { PURCHASE_ORDER_REPO } from '../../../../constants';
import { PurchaseOrder, PurchaseOrderFilter } from '../../domain';
import { IPurchaseOrderRepo } from '../..';
import { PurchaseOrderFilterNormalizer } from '../../helpers';
import { ListPurchaseOrdersQuery } from './list-purchase-orders.query';

@QueryHandlerStrict(ListPurchaseOrdersQuery)
export class ListPurchaseOrdersQueryHandler implements IQueryHandler<ListPurchaseOrdersQuery, PurchaseOrder[]> {
  constructor(
    @Inject(PURCHASE_ORDER_REPO) protected readonly repo: IPurchaseOrderRepo,
    @Inject(PurchaseOrderFilterNormalizer) protected readonly filterNormalizer: IFilterNormalizer<PurchaseOrderFilter>,
    @InjectPinoLogger(ListPurchaseOrdersQueryHandler.name) protected readonly logger: PinoLogger,
  ) {}

  public async execute(query: ListPurchaseOrdersQuery): Promise<PurchaseOrder[]> {
    this.logger.info(`Executing Query "${ListPurchaseOrdersQuery.name}"`);
    const filter = this.filterNormalizer.normalize(query);
    return this.repo.allAsync(filter);
  }
}
