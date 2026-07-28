import { Inject } from '@nestjs/common';
import type { IQueryHandler } from '@nestjs/cqrs';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { QueryHandlerStrict } from 'src/common';
import { INVENTORY_REPO } from '../../../../constants';
import { Inventory } from '../../domain';
import { IInventoryRepo } from '../../i-inventory.repo';
import { GetLowStockQuery } from './get-low-stock.query';

@QueryHandlerStrict(GetLowStockQuery)
export class GetLowStockQueryHandler implements IQueryHandler<GetLowStockQuery, Inventory[]> {
  constructor(
    @Inject(INVENTORY_REPO) private readonly repo: IInventoryRepo,
    @InjectPinoLogger(GetLowStockQueryHandler.name) private readonly logger: PinoLogger,
  ) {}

  public async execute(query: GetLowStockQuery): Promise<Inventory[]> {
    this.logger.info(`Executing ${GetLowStockQuery.name} org=${query.organizationId}`);
    return this.repo.getLowStockAsync(query.organizationId);
  }
}
