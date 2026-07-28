import { Inject } from '@nestjs/common';
import type { IQueryHandler } from '@nestjs/cqrs';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { QueryHandlerStrict } from 'src/common';
import { STOCK_MOVEMENT_REPO } from '../../../../constants';
import { StockMovement } from '../../domain';
import { IStockMovementRepo } from '../../i-stock-movement.repo';
import { ListMovementsByInventoryQuery } from './list-movements-by-inventory.query';

@QueryHandlerStrict(ListMovementsByInventoryQuery)
export class ListMovementsByInventoryQueryHandler implements IQueryHandler<ListMovementsByInventoryQuery, StockMovement[]> {
  constructor(
    @Inject(STOCK_MOVEMENT_REPO) private readonly repo: IStockMovementRepo,
    @InjectPinoLogger(ListMovementsByInventoryQueryHandler.name) private readonly logger: PinoLogger,
  ) {}

  public async execute(query: ListMovementsByInventoryQuery): Promise<StockMovement[]> {
    this.logger.info(`Executing ${ListMovementsByInventoryQuery.name} inventoryId=${query.inventoryId}`);
    return this.repo.listByInventoryAsync(query.inventoryId);
  }
}
