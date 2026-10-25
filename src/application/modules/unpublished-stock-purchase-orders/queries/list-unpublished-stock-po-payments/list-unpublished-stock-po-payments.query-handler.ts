import { Inject } from '@nestjs/common';
import type { IQueryHandler } from '@nestjs/cqrs';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { QueryHandlerStrict } from '../../../../../common';
import { UNPUBLISHED_STOCK_PO_PAYMENT_REPO } from '../../../../constants';
import { UnpublishedStockPOPayment } from '../../domain';
import { IUnpublishedStockPOPaymentRepo } from '../../i-unpublished-stock-po-payment.repo';
import { ListUnpublishedStockPOPaymentsQuery } from './list-unpublished-stock-po-payments.query';

@QueryHandlerStrict(ListUnpublishedStockPOPaymentsQuery)
export class ListUnpublishedStockPOPaymentsQueryHandler
  implements IQueryHandler<ListUnpublishedStockPOPaymentsQuery, UnpublishedStockPOPayment[]>
{
  constructor(
    @Inject(UNPUBLISHED_STOCK_PO_PAYMENT_REPO) private readonly repo: IUnpublishedStockPOPaymentRepo,
    @InjectPinoLogger(ListUnpublishedStockPOPaymentsQueryHandler.name) private readonly logger: PinoLogger,
  ) {}

  public async execute(query: ListUnpublishedStockPOPaymentsQuery): Promise<UnpublishedStockPOPayment[]> {
    this.logger.info(`Executing ${ListUnpublishedStockPOPaymentsQuery.name} poId=${query.purchaseOrderId}`);
    return this.repo.allAsync({ purchaseOrderId: query.purchaseOrderId });
  }
}
