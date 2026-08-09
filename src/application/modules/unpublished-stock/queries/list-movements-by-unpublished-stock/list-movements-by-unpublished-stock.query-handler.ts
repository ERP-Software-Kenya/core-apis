import { Inject } from '@nestjs/common';
import type { IQueryHandler } from '@nestjs/cqrs';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { QueryHandlerStrict } from 'src/common';
import { UNPUBLISHED_STOCK_MOVEMENT_REPO } from '../../../../constants';
import { UnpublishedStockMovement } from '../../domain';
import { IUnpublishedStockMovementRepo } from '../../i-unpublished-stock-movement.repo';
import { ListMovementsByUnpublishedStockQuery } from './list-movements-by-unpublished-stock.query';

@QueryHandlerStrict(ListMovementsByUnpublishedStockQuery)
export class ListMovementsByUnpublishedStockQueryHandler implements IQueryHandler<ListMovementsByUnpublishedStockQuery, UnpublishedStockMovement[]> {
  constructor(
    @Inject(UNPUBLISHED_STOCK_MOVEMENT_REPO) private readonly repo: IUnpublishedStockMovementRepo,
    @InjectPinoLogger(ListMovementsByUnpublishedStockQueryHandler.name) private readonly logger: PinoLogger,
  ) {}

  public async execute(query: ListMovementsByUnpublishedStockQuery): Promise<UnpublishedStockMovement[]> {
    this.logger.info(`Executing ${ListMovementsByUnpublishedStockQuery.name} unpublishedStockId=${query.unpublishedStockId}`);
    return this.repo.listByUnpublishedStockAsync(query.unpublishedStockId);
  }
}
