import { Inject } from '@nestjs/common';
import { ICommandHandler } from '@nestjs/cqrs';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { CommandHandlerStrict } from '../../../../../common';
import { PURCHASE_ORDER_REPO } from '../../../../constants';
import { PurchaseOrder } from '../../domain';
import { IPurchaseOrderRepo } from '../..';
import { RecordPurchaseOrderPaymentCommand } from './record-purchaseorder-payment.command';

@CommandHandlerStrict(RecordPurchaseOrderPaymentCommand)
export class RecordPurchaseOrderPaymentCommandHandler
  implements ICommandHandler<RecordPurchaseOrderPaymentCommand, PurchaseOrder>
{
  constructor(
    @Inject(PURCHASE_ORDER_REPO) private readonly poRepo: IPurchaseOrderRepo,
    @InjectPinoLogger(RecordPurchaseOrderPaymentCommandHandler.name) private readonly logger: PinoLogger,
  ) {}

  public async execute(command: RecordPurchaseOrderPaymentCommand): Promise<PurchaseOrder> {
    this.logger.info(`Executing ${RecordPurchaseOrderPaymentCommand.name} poId=${command.purchaseOrderId}`);

    return this.poRepo.recordPaymentAsync({
      purchaseOrderId: command.purchaseOrderId,
      organizationId: command.organizationId,
      amount: Number(command.amount),
      paymentMethod: command.paymentMethod,
      paidAt: command.paidAt ?? new Date(),
      note: command.note,
      performedById: command.performedById,
    });
  }
}
