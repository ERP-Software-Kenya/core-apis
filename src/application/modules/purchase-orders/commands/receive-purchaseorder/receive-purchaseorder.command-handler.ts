import { Inject } from '@nestjs/common';
import { ICommandHandler } from '@nestjs/cqrs';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { CommandHandlerStrict } from '../../../../../common';
import { PURCHASE_ORDER_REPO } from '../../../../constants';
import { PurchaseOrder } from '../../domain';
import { IPurchaseOrderRepo } from '../..';
import { ActivityLogService } from 'src/application/shared';
import { EActivityAction } from 'src/infrastructure/persistence/entities/activity-log.entity';
import { ReceivePurchaseOrderCommand } from './receive-purchaseorder.command';

@CommandHandlerStrict(ReceivePurchaseOrderCommand)
export class ReceivePurchaseOrderCommandHandler implements ICommandHandler<ReceivePurchaseOrderCommand, PurchaseOrder> {
  constructor(
    @Inject(PURCHASE_ORDER_REPO) private readonly poRepo: IPurchaseOrderRepo,
    private readonly activityLog: ActivityLogService,
    @InjectPinoLogger(ReceivePurchaseOrderCommandHandler.name) private readonly logger: PinoLogger,
  ) {}

  public async execute(command: ReceivePurchaseOrderCommand): Promise<PurchaseOrder> {
    this.logger.info(`Executing ${ReceivePurchaseOrderCommand.name} poId=${command.purchaseOrderId}`);

    const result = await this.poRepo.receiveAsync({
      purchaseOrderId: command.purchaseOrderId,
      organizationId: command.organizationId,
      items: command.items,
    });
    this.activityLog.record({
      action: EActivityAction.PurchaseOrderGoodsReceived,
      entityType: 'PurchaseOrder',
      entityId: result.id,
      organizationId: result.organizationId,
      metadata: { poNumber: result.poNumber, status: result.status },
    });
    return result;
  }
}
