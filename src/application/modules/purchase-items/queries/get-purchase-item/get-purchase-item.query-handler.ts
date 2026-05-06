import { Inject } from '@nestjs/common';
import { IQueryHandler } from '@nestjs/cqrs';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { QueryHandlerStrict } from '../../../../../common';
import { PURCHASE_ITEM_REPO } from '../../../../constants';
import { PurchaseItem } from '../../domain';
import { IPurchaseItemRepo } from '../..';
import { GetPurchaseItemQuery } from './get-purchase-item.query';

@QueryHandlerStrict(GetPurchaseItemQuery)
export class GetPurchaseItemQueryHandler implements IQueryHandler<GetPurchaseItemQuery, PurchaseItem> {
  constructor(
    @Inject(PURCHASE_ITEM_REPO) private readonly repo: IPurchaseItemRepo,
    @InjectPinoLogger(GetPurchaseItemQueryHandler.name) private readonly logger: PinoLogger,
  ) {}

  public async execute(query: GetPurchaseItemQuery): Promise<PurchaseItem> {
    this.logger.info(`Executing ${GetPurchaseItemQuery.name} id=${query.id}`);
    return this.repo.getAsync(query.id);
  }
}
