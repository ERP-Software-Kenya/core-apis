import { Inject, NotFoundException } from '@nestjs/common';
import { ICommandHandler } from '@nestjs/cqrs';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { CommandHandlerStrict } from '../../../../../common';
import { BILL_REPO, ORDER_REPO, PAYMENT_TRANSACTION_REPO } from '../../../../constants';
import { IBillRepo } from '../../../bills';
import { IOrderRepo } from '../../../orders';
import { IPaymentTransactionRepo } from '../../../payment-transactions';
import { PaymentTransaction } from '../../../payment-transactions/domain';
import { OrderDispatchPaymentService } from '../../../../shared/services/order-dispatch-payment.service';
import { OrderNotFoundException } from '../../exceptions';
import { RecordOrderPaymentCommand } from './record-order-payment.command';

export type RecordOrderPaymentResult = {
  amountPaid: number;
  paymentStatus: string;
};

@CommandHandlerStrict(RecordOrderPaymentCommand)
export class RecordOrderPaymentCommandHandler
  implements ICommandHandler<RecordOrderPaymentCommand, RecordOrderPaymentResult>
{
  public constructor(
    @Inject(ORDER_REPO) private readonly orderRepo: IOrderRepo,
    @Inject(BILL_REPO) private readonly billRepo: IBillRepo,
    @Inject(PAYMENT_TRANSACTION_REPO) private readonly paymentTxnRepo: IPaymentTransactionRepo,
    private readonly dispatchPaymentService: OrderDispatchPaymentService,
    @InjectPinoLogger(RecordOrderPaymentCommandHandler.name) private readonly logger: PinoLogger,
  ) {}

  public async execute(command: RecordOrderPaymentCommand): Promise<RecordOrderPaymentResult> {
    this.logger.info(`Executing Command '${RecordOrderPaymentCommand.name}' orderId=${command.orderId}`);

    const order = await this.orderRepo.getAsync(command.orderId);
    if (!order) throw new OrderNotFoundException();

    const bill = await this.billRepo.findBySourceOrderIdAsync(command.orderId);
    if (!bill) throw new NotFoundException('No bill linked to this order');

    const tx = new PaymentTransaction();
    tx.orgId = command.organizationId;
    tx.referenceId = bill.id;
    tx.referenceType = 'bill';
    tx.type = 'payment';
    tx.method = command.method;
    tx.amount = command.amount;
    tx.status = 'completed';
    await this.paymentTxnRepo.createAsync(tx);

    await this.dispatchPaymentService.syncOrderPaymentStatusAsync(command.orderId);

    const updated = await this.orderRepo.getAsync(command.orderId);
    const evaluation = await this.dispatchPaymentService.evaluateOrderAsync(command.orderId);

    return {
      amountPaid: evaluation.amountPaid,
      paymentStatus: updated?.paymentStatus ?? 'UNPAID',
    };
  }
}
