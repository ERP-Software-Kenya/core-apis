import { Inject } from '@nestjs/common';
import { IQueryHandler } from '@nestjs/cqrs';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { QueryHandlerStrict } from '../../../../../common';
import { UNPUBLISHED_STOCK_PO_REPO } from '../../../../constants';
import { UnpublishedStockPurchaseOrder } from '../../domain';
import { IUnpublishedStockPORepo } from '../../i-unpublished-stock-po.repo';
import { GetUnpublishedStockPOQuery } from './get-unpublished-stock-po.query';

@QueryHandlerStrict(GetUnpublishedStockPOQuery)
export class GetUnpublishedStockPOQueryHandler
  implements IQueryHandler<GetUnpublishedStockPOQuery, UnpublishedStockPurchaseOrder>
{
  constructor(
    @Inject(UNPUBLISHED_STOCK_PO_REPO) private readonly repo: IUnpublishedStockPORepo,
    @InjectPinoLogger(GetUnpublishedStockPOQueryHandler.name) private readonly logger: PinoLogger,
  ) {}

  public async execute(query: GetUnpublishedStockPOQuery): Promise<UnpublishedStockPurchaseOrder> {
    this.logger.info(`Executing ${GetUnpublishedStockPOQuery.name} id=${query.id}`);
    return this.repo.getAsync(query.id);
  }
}
