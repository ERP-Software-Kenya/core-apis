import { Inject } from '@nestjs/common';
import { IQueryHandler } from '@nestjs/cqrs';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { QueryHandlerStrict } from '../../../../../common';
import { PURCHASE_ORDER_REPO } from '../../../../constants';
import { PurchaseOrder } from '../../domain';
import { IPurchaseOrderRepo } from '../..';
import { GetPurchaseOrderQuery } from './get-purchaseorder.query';

@QueryHandlerStrict(GetPurchaseOrderQuery)
export class GetPurchaseOrderQueryHandler implements IQueryHandler<GetPurchaseOrderQuery, PurchaseOrder> {
  constructor(
    @Inject(PURCHASE_ORDER_REPO) private readonly repo: IPurchaseOrderRepo,
    @InjectPinoLogger(GetPurchaseOrderQueryHandler.name) private readonly logger: PinoLogger,
  ) {}

  public async execute(query: GetPurchaseOrderQuery): Promise<PurchaseOrder> {
    this.logger.info(`Executing ${GetPurchaseOrderQuery.name} id=${query.id}`);
    return this.repo.getAsync(query.id);
  }
}
