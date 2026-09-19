import { BadRequestException, Inject } from '@nestjs/common';
import { ICommandHandler } from '@nestjs/cqrs';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { CommandHandlerStrict } from '../../../../../common';
import { UNPUBLISHED_STOCK_PO_PAYMENT_REPO, UNPUBLISHED_STOCK_PO_REPO } from '../../../../constants';
import { UnpublishedStockPOPayment, UnpublishedStockPurchaseOrder } from '../../domain';
import { IUnpublishedStockPORepo } from '../../i-unpublished-stock-po.repo';
import { IUnpublishedStockPOPaymentRepo } from '../../i-unpublished-stock-po-payment.repo';
import { EPurchaseOrderStatus } from 'src/application/shared/enums';
import { RecordUnpublishedStockPOPaymentCommand } from './record-unpublished-stock-po-payment.command';

const BLOCKED_STATUSES: EPurchaseOrderStatus[] = [
  EPurchaseOrderStatus.Draft,
  EPurchaseOrderStatus.Cancelled,
];

@CommandHandlerStrict(RecordUnpublishedStockPOPaymentCommand)
export class RecordUnpublishedStockPOPaymentCommandHandler
  implements ICommandHandler<RecordUnpublishedStockPOPaymentCommand, UnpublishedStockPurchaseOrder>
{
  constructor(
    @Inject(UNPUBLISHED_STOCK_PO_REPO) private readonly poRepo: IUnpublishedStockPORepo,
    @Inject(UNPUBLISHED_STOCK_PO_PAYMENT_REPO) private readonly paymentRepo: IUnpublishedStockPOPaymentRepo,
    @InjectPinoLogger(RecordUnpublishedStockPOPaymentCommandHandler.name) private readonly logger: PinoLogger,
  ) {}

  public async execute(command: RecordUnpublishedStockPOPaymentCommand): Promise<UnpublishedStockPurchaseOrder> {
    this.logger.info(`Executing ${RecordUnpublishedStockPOPaymentCommand.name} poId=${command.purchaseOrderId}`);
    const po = await this.poRepo.getAsync(command.purchaseOrderId);

    if (po.organizationId !== command.organizationId) {
      throw new BadRequestException('Purchase order does not belong to the current organization');
    }

    if (BLOCKED_STATUSES.includes(po.status)) {
      throw new BadRequestException(`Cannot record payment for a purchase order with status "${po.status}"`);
    }

    const currentAmountPaid = Number(po.amountPaid ?? 0);
    const remaining         = Number(po.totalAmount) - currentAmountPaid;

    if (Number(command.amount) > remaining) {
      throw new BadRequestException(`Payment amount ${command.amount} exceeds outstanding balance ${remaining}`);
    }

    const payment             = new UnpublishedStockPOPayment();
    payment.organizationId    = command.organizationId;
    payment.purchaseOrderId   = command.purchaseOrderId;
    payment.supplierId        = po.supplierId;
    payment.amount            = command.amount;
    payment.paymentMethod     = command.paymentMethod;
    payment.paidAt            = command.paidAt ?? new Date();
    payment.note              = command.note;
    payment.performedById     = command.performedById;

    await this.paymentRepo.createAsync(payment);

    po.amountPaid = currentAmountPaid + Number(command.amount);
    return this.poRepo.updateAsync(po);
  }
}
