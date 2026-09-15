import { BadRequestException, Inject } from '@nestjs/common';
import { ICommandHandler } from '@nestjs/cqrs';
import { InjectDataSource } from '@nestjs/typeorm';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { DataSource } from 'typeorm';
import { CommandHandlerStrict } from '../../../../../common';
import { PURCHASE_ORDER_REPO } from '../../../../constants';
import { PurchaseOrder } from '../../domain';
import { IPurchaseOrderRepo } from '../..';
import { EPurchaseOrderStatus } from 'src/application/shared/enums';
import { PurchaseOrderEntity } from '../../../../../infrastructure/persistence/entities/purchase-order.entity';
import { PurchaseOrderPaymentEntity } from '../../../../../infrastructure/persistence/entities/purchase-order-payment.entity';
import { RecordPurchaseOrderPaymentCommand } from './record-purchaseorder-payment.command';

const BLOCKED_STATUSES: EPurchaseOrderStatus[] = [
  EPurchaseOrderStatus.Draft,
  EPurchaseOrderStatus.Cancelled,
];

@CommandHandlerStrict(RecordPurchaseOrderPaymentCommand)
export class RecordPurchaseOrderPaymentCommandHandler
  implements ICommandHandler<RecordPurchaseOrderPaymentCommand, PurchaseOrder>
{
  constructor(
    @Inject(PURCHASE_ORDER_REPO) private readonly poRepo: IPurchaseOrderRepo,
    @InjectDataSource() private readonly dataSource: DataSource,
    @InjectPinoLogger(RecordPurchaseOrderPaymentCommandHandler.name) private readonly logger: PinoLogger,
  ) {}

  public async execute(command: RecordPurchaseOrderPaymentCommand): Promise<PurchaseOrder> {
    this.logger.info(`Executing ${RecordPurchaseOrderPaymentCommand.name} poId=${command.purchaseOrderId}`);

    const po = await this.poRepo.getAsync(command.purchaseOrderId);

    if (po.organizationId !== command.organizationId) {
      throw new BadRequestException('Purchase order does not belong to the current organization');
    }

    if (BLOCKED_STATUSES.includes(po.status)) {
      throw new BadRequestException(`Cannot record payment for a purchase order with status "${po.status}"`);
    }

    const currentAmountPaid = Number(po.amountPaid ?? 0);
    const remaining = Number(po.totalAmount) - currentAmountPaid;

    if (Number(command.amount) > remaining) {
      throw new BadRequestException(
        `Payment amount ${command.amount} exceeds outstanding balance ${remaining}`,
      );
    }

    await this.dataSource.transaction(async (manager) => {
      const payment = manager.create(PurchaseOrderPaymentEntity, {
        organizationId:  command.organizationId,
        purchaseOrderId: command.purchaseOrderId,
        supplierId:      po.supplierId,
        amount:          command.amount,
        paymentMethod:   command.paymentMethod,
        paidAt:          command.paidAt ?? new Date(),
        note:            command.note,
        performedById:   command.performedById,
      });
      await manager.save(PurchaseOrderPaymentEntity, payment);

      await manager.increment(
        PurchaseOrderEntity,
        { id: command.purchaseOrderId },
        'amountPaid',
        Number(command.amount),
      );
    });

    return this.poRepo.getAsync(command.purchaseOrderId);
  }
}
