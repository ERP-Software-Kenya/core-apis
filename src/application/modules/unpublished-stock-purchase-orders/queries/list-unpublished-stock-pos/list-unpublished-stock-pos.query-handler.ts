import { Inject } from '@nestjs/common';
import type { IQueryHandler } from '@nestjs/cqrs';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { QueryHandlerStrict, IFilterNormalizer } from '../../../../../common';
import { UNPUBLISHED_STOCK_PO_REPO } from '../../../../constants';
import { UnpublishedStockPurchaseOrder, UnpublishedStockPOFilter } from '../../domain';
import { IUnpublishedStockPORepo } from '../../i-unpublished-stock-po.repo';
import { UnpublishedStockPOFilterNormalizer } from '../../helpers';
import { ListUnpublishedStockPOsQuery } from './list-unpublished-stock-pos.query';

@QueryHandlerStrict(ListUnpublishedStockPOsQuery)
export class ListUnpublishedStockPOsQueryHandler
  implements IQueryHandler<ListUnpublishedStockPOsQuery, UnpublishedStockPurchaseOrder[]>
{
  constructor(
    @Inject(UNPUBLISHED_STOCK_PO_REPO) protected readonly repo: IUnpublishedStockPORepo,
    @Inject(UnpublishedStockPOFilterNormalizer) protected readonly filterNormalizer: IFilterNormalizer<UnpublishedStockPOFilter>,
    @InjectPinoLogger(ListUnpublishedStockPOsQueryHandler.name) protected readonly logger: PinoLogger,
  ) {}

  public async execute(query: ListUnpublishedStockPOsQuery): Promise<UnpublishedStockPurchaseOrder[]> {
    this.logger.info(`Executing Query "${ListUnpublishedStockPOsQuery.name}"`);
    const filter = this.filterNormalizer.normalize(query);
    return this.repo.allAsync(filter);
  }
}
