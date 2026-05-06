import { Inject } from '@nestjs/common';
import type { IQueryHandler } from '@nestjs/cqrs';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { QueryHandlerStrict, IFilterNormalizer, IPageable } from '../../../../../common';
import { ITEM_RETURN_REPO } from '../../../../constants';
import { ItemReturn, ItemReturnFilter } from '../../domain';
import { IItemReturnRepo } from '../..';
import { ItemReturnFilterNormalizer } from '../../helpers';
import { SearchItemReturnsQuery } from './search-item-returns.query';

@QueryHandlerStrict(SearchItemReturnsQuery)
export class SearchItemReturnsQueryHandler implements IQueryHandler<SearchItemReturnsQuery, IPageable<ItemReturn>> {
  constructor(
    @Inject(ITEM_RETURN_REPO) protected readonly repo: IItemReturnRepo,
    @Inject(ItemReturnFilterNormalizer) protected readonly filterNormalizer: IFilterNormalizer<ItemReturnFilter>,
    @InjectPinoLogger(SearchItemReturnsQueryHandler.name) protected readonly logger: PinoLogger,
  ) {}

  public async execute(query: SearchItemReturnsQuery): Promise<IPageable<ItemReturn>> {
    this.logger.info(`Executing Query "${SearchItemReturnsQuery.name}"`);
    const filter = this.filterNormalizer.pageableNormalize(query);
    return this.repo.pagedAsync(filter);
  }
}
