import { Inject } from '@nestjs/common';
import { IQueryHandler } from '@nestjs/cqrs';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { QueryHandlerStrict } from '../../../../../common';
import { STOCK_MOVEMENT_REPO } from '../../../../constants';
import { StockMovement } from '../../domain';
import { IStockMovementRepo } from '../..';
import { GetStockMovementQuery } from './get-stock-movement.query';

@QueryHandlerStrict(GetStockMovementQuery)
export class GetStockMovementQueryHandler implements IQueryHandler<GetStockMovementQuery, StockMovement> {
  constructor(
    @Inject(STOCK_MOVEMENT_REPO) private readonly repo: IStockMovementRepo,
    @InjectPinoLogger(GetStockMovementQueryHandler.name) private readonly logger: PinoLogger,
  ) {}

  public async execute(query: GetStockMovementQuery): Promise<StockMovement> {
    this.logger.info(`Executing ${GetStockMovementQuery.name} id=${query.id}`);
    return this.repo.getAsync(query.id);
  }
}
