import { Inject } from '@nestjs/common';
import type { IQueryHandler } from '@nestjs/cqrs';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { QueryHandlerStrict } from '../../../../../common';
import { IFilterNormalizer, IPageable } from '../../../../../common';
import { INVENTORY_REPO } from '../../../../constants';
import { Inventory, InventoryFilter } from '../../domain';
import { IInventoryRepo } from '../..';
import { InventoryFilterNormalizer } from '../../helpers';
import { SearchInventoryQuery } from './search-inventory.query';

@QueryHandlerStrict(SearchInventoryQuery)
export class SearchInventoryQueryHandler implements IQueryHandler<SearchInventoryQuery, IPageable<Inventory>> {
  constructor(
    @Inject(INVENTORY_REPO) protected readonly repo: IInventoryRepo,
    @Inject(InventoryFilterNormalizer) protected readonly filterNormalizer: IFilterNormalizer<InventoryFilter>,
    @InjectPinoLogger(SearchInventoryQueryHandler.name) protected readonly logger: PinoLogger,
  ) {}

  public async execute(query: SearchInventoryQuery): Promise<IPageable<Inventory>> {
    this.logger.info(`Executing Query "${SearchInventoryQuery.name}"`);
    const filter = this.filterNormalizer.pageableNormalize(query);
    return this.repo.pagedAsync(filter);
  }
}
