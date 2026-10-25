import { Inject } from '@nestjs/common';
import type { IQueryHandler } from '@nestjs/cqrs';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { QueryHandlerStrict } from '../../../../../common';
import { PURCHASE_ORDER_PAYMENT_REPO } from '../../../../constants';
import { PurchaseOrderPayment } from '../../domain';
import { IPurchaseOrderPaymentRepo } from '../../i-purchase-order-payment.repo';
import { ListPurchaseOrderPaymentsQuery } from './list-purchaseorder-payments.query';

@QueryHandlerStrict(ListPurchaseOrderPaymentsQuery)
export class ListPurchaseOrderPaymentsQueryHandler
  implements IQueryHandler<ListPurchaseOrderPaymentsQuery, PurchaseOrderPayment[]>
{
  constructor(
    @Inject(PURCHASE_ORDER_PAYMENT_REPO) private readonly repo: IPurchaseOrderPaymentRepo,
    @InjectPinoLogger(ListPurchaseOrderPaymentsQueryHandler.name) private readonly logger: PinoLogger,
  ) {}

  public async execute(query: ListPurchaseOrderPaymentsQuery): Promise<PurchaseOrderPayment[]> {
    this.logger.info(`Executing ${ListPurchaseOrderPaymentsQuery.name} poId=${query.purchaseOrderId}`);
    return this.repo.allAsync({ purchaseOrderId: query.purchaseOrderId });
  }
}
