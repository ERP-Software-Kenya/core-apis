import { Inject } from '@nestjs/common';
import type { IQueryHandler } from '@nestjs/cqrs';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { QueryHandlerStrict } from 'src/common';
import { INVENTORY_REPO } from '../../../../constants';
import { Inventory } from '../../domain';
import { IInventoryRepo } from '../../i-inventory.repo';
import { GetValuationQuery } from './get-valuation.query';

@QueryHandlerStrict(GetValuationQuery)
export class GetValuationQueryHandler implements IQueryHandler<GetValuationQuery, Inventory[]> {
  constructor(
    @Inject(INVENTORY_REPO) private readonly repo: IInventoryRepo,
    @InjectPinoLogger(GetValuationQueryHandler.name) private readonly logger: PinoLogger,
  ) {}

  public async execute(query: GetValuationQuery): Promise<Inventory[]> {
    this.logger.info(`Executing ${GetValuationQuery.name} org=${query.organizationId}`);
    return this.repo.getValuationAsync(query.organizationId);
  }
}
