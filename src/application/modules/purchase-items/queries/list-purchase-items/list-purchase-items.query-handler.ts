import { Inject } from '@nestjs/common';
import { IQueryHandler } from '@nestjs/cqrs';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { QueryHandlerStrict } from '../../../../../common';
import { PURCHASE_ITEM_REPO } from '../../../../constants';
import { PurchaseItem } from '../../domain';
import { IPurchaseItemRepo } from '../../i-purchase-item.repo';
import { ListPurchaseItemsQuery } from './list-purchase-items.query';

@QueryHandlerStrict(ListPurchaseItemsQuery)
export class ListPurchaseItemsQueryHandler implements IQueryHandler<ListPurchaseItemsQuery, PurchaseItem[]> {
  constructor(
    @Inject(PURCHASE_ITEM_REPO) private readonly repo: IPurchaseItemRepo,
    @InjectPinoLogger(ListPurchaseItemsQueryHandler.name) private readonly logger: PinoLogger,
  ) {}

  public async execute(query: ListPurchaseItemsQuery): Promise<PurchaseItem[]> {
    this.logger.info(`Listing items for purchase order ${query.purchaseOrderId}`);
    return this.repo.allAsync({ purchaseOrderId: query.purchaseOrderId });
  }
}
