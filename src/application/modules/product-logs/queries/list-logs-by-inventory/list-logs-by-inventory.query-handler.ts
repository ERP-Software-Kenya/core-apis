import { Inject } from '@nestjs/common';
import type { IQueryHandler } from '@nestjs/cqrs';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { EOrder, QueryHandlerStrict } from 'src/common';
import { PRODUCT_LOG_REPO } from '../../../../constants';
import { ProductLog } from '../../domain';
import { IProductLogRepo } from '../../i-product-log.repo';
import { ListLogsByInventoryQuery } from './list-logs-by-inventory.query';

@QueryHandlerStrict(ListLogsByInventoryQuery)
export class ListLogsByInventoryQueryHandler implements IQueryHandler<ListLogsByInventoryQuery, ProductLog[]> {
  constructor(
    @Inject(PRODUCT_LOG_REPO) private readonly repo: IProductLogRepo,
    @InjectPinoLogger(ListLogsByInventoryQueryHandler.name) private readonly logger: PinoLogger,
  ) {}

  public async execute(query: ListLogsByInventoryQuery): Promise<ProductLog[]> {
    this.logger.info(`Executing ${ListLogsByInventoryQuery.name} inventoryId=${query.inventoryId}`);
    return this.repo.allAsync({ inventoryId: query.inventoryId, $orderBy: 'createdAt', $order: EOrder.Desc });
  }
}
