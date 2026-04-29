import { Inject } from '@nestjs/common';
import type { IQueryHandler } from '@nestjs/cqrs';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { QueryHandlerStrict } from '../../../../../common';
import { IFilterNormalizer } from '../../../../../common';
import { INVENTORY_REPO } from '../../../../constants';
import { Inventory, InventoryFilter } from '../../domain';
import { IInventoryRepo } from '../..';
import { InventoryFilterNormalizer } from '../../helpers';
import { ListInventoryQuery } from './list-inventory.query';

@QueryHandlerStrict(ListInventoryQuery)
export class ListInventoryQueryHandler implements IQueryHandler<ListInventoryQuery, Inventory[]> {
  constructor(
    @Inject(INVENTORY_REPO) protected readonly repo: IInventoryRepo,
    @Inject(InventoryFilterNormalizer) protected readonly filterNormalizer: IFilterNormalizer<InventoryFilter>,
    @InjectPinoLogger(ListInventoryQueryHandler.name) protected readonly logger: PinoLogger,
  ) {}

  public async execute(query: ListInventoryQuery): Promise<Inventory[]> {
    this.logger.info(`Executing Query "${ListInventoryQuery.name}"`);
    const filter = this.filterNormalizer.normalize(query);
    return this.repo.allAsync(filter);
  }
}
