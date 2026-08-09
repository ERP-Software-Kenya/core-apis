import { Inject } from '@nestjs/common';
import type { IQueryHandler } from '@nestjs/cqrs';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { QueryHandlerStrict } from 'src/common';
import { UNPUBLISHED_STOCK_REPO } from '../../../../constants';
import { UnpublishedStock } from '../../domain';
import { IUnpublishedStockRepo } from '../../i-unpublished-stock.repo';
import { ListUnpublishedStockQuery } from './list-unpublished-stock.query';

@QueryHandlerStrict(ListUnpublishedStockQuery)
export class ListUnpublishedStockQueryHandler implements IQueryHandler<ListUnpublishedStockQuery, UnpublishedStock[]> {
  constructor(
    @Inject(UNPUBLISHED_STOCK_REPO) private readonly repo: IUnpublishedStockRepo,
    @InjectPinoLogger(ListUnpublishedStockQueryHandler.name) private readonly logger: PinoLogger,
  ) {}

  public async execute(query: ListUnpublishedStockQuery): Promise<UnpublishedStock[]> {
    this.logger.info(`Executing ${ListUnpublishedStockQuery.name}`);
    return this.repo.allAsync(query);
  }
}
