import { Inject } from '@nestjs/common';
import type { IQueryHandler } from '@nestjs/cqrs';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { QueryHandlerStrict } from '../../../../../common';
import { INVENTORY_REPO } from '../../../../constants';
import { Inventory } from '../../domain';
import { IInventoryRepo } from '../..';
import { GetInventoryQuery } from './get-inventory.query';

@QueryHandlerStrict(GetInventoryQuery)
export class GetInventoryQueryHandler implements IQueryHandler<GetInventoryQuery, Inventory> {
  constructor(
    @Inject(INVENTORY_REPO) private readonly repo: IInventoryRepo,
    @InjectPinoLogger(GetInventoryQueryHandler.name) private readonly logger: PinoLogger,
  ) {}

  public async execute(query: GetInventoryQuery): Promise<Inventory> {
    this.logger.info(`Executing ${GetInventoryQuery.name} id=${query.id}`);
    return this.repo.getAsync(query.id);
  }
}
