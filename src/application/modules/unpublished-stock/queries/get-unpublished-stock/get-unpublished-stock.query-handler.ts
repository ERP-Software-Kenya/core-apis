import { Inject } from '@nestjs/common';
import type { IQueryHandler } from '@nestjs/cqrs';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { QueryHandlerStrict } from 'src/common';
import { UNPUBLISHED_STOCK_REPO } from '../../../../constants';
import { UnpublishedStock } from '../../domain';
import { IUnpublishedStockRepo } from '../../i-unpublished-stock.repo';
import { GetUnpublishedStockQuery } from './get-unpublished-stock.query';

@QueryHandlerStrict(GetUnpublishedStockQuery)
export class GetUnpublishedStockQueryHandler implements IQueryHandler<GetUnpublishedStockQuery, UnpublishedStock> {
  constructor(
    @Inject(UNPUBLISHED_STOCK_REPO) private readonly repo: IUnpublishedStockRepo,
    @InjectPinoLogger(GetUnpublishedStockQueryHandler.name) private readonly logger: PinoLogger,
  ) {}

  public async execute(query: GetUnpublishedStockQuery): Promise<UnpublishedStock> {
    this.logger.info(`Executing ${GetUnpublishedStockQuery.name} id=${query.id}`);
    return this.repo.getAsync(query.id);
  }
}
