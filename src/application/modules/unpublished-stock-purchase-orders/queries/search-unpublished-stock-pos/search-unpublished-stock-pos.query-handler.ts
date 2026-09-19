import { Inject } from '@nestjs/common';
import type { IQueryHandler } from '@nestjs/cqrs';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { QueryHandlerStrict, IFilterNormalizer, IPageable } from '../../../../../common';
import { UNPUBLISHED_STOCK_PO_REPO } from '../../../../constants';
import { UnpublishedStockPurchaseOrder, UnpublishedStockPOFilter } from '../../domain';
import { IUnpublishedStockPORepo } from '../../i-unpublished-stock-po.repo';
import { UnpublishedStockPOFilterNormalizer } from '../../helpers';
import { SearchUnpublishedStockPOsQuery } from './search-unpublished-stock-pos.query';

@QueryHandlerStrict(SearchUnpublishedStockPOsQuery)
export class SearchUnpublishedStockPOsQueryHandler
  implements IQueryHandler<SearchUnpublishedStockPOsQuery, IPageable<UnpublishedStockPurchaseOrder>>
{
  constructor(
    @Inject(UNPUBLISHED_STOCK_PO_REPO) protected readonly repo: IUnpublishedStockPORepo,
    @Inject(UnpublishedStockPOFilterNormalizer) protected readonly filterNormalizer: IFilterNormalizer<UnpublishedStockPOFilter>,
    @InjectPinoLogger(SearchUnpublishedStockPOsQueryHandler.name) protected readonly logger: PinoLogger,
  ) {}

  public async execute(query: SearchUnpublishedStockPOsQuery): Promise<IPageable<UnpublishedStockPurchaseOrder>> {
    this.logger.info(`Executing Query "${SearchUnpublishedStockPOsQuery.name}"`);
    const filter = this.filterNormalizer.pageableNormalize(query);
    return this.repo.pagedAsync(filter);
  }
}
