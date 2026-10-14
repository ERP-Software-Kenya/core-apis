import { Inject } from '@nestjs/common';
import { ICommandHandler } from '@nestjs/cqrs';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { CommandHandlerStrict } from '../../../../../common';
import { PURCHASE_ORDER_REPO } from '../../../../constants';
import { PurchaseOrder } from '../../domain';
import { IPurchaseOrderRepo } from '../..';
import { ActivityLogService } from 'src/application/shared';
import { EActivityAction } from 'src/infrastructure/persistence/entities/activity-log.entity';
import { CreatePurchaseOrderCommand } from './create-purchaseorder.command';

@CommandHandlerStrict(CreatePurchaseOrderCommand)
export class CreatePurchaseOrderCommandHandler implements ICommandHandler<CreatePurchaseOrderCommand, PurchaseOrder> {
  constructor(
    @Inject(PURCHASE_ORDER_REPO) private readonly poRepo: IPurchaseOrderRepo,
    private readonly activityLog: ActivityLogService,
    @InjectPinoLogger(CreatePurchaseOrderCommandHandler.name) private readonly logger: PinoLogger,
  ) {}

  public async execute(command: CreatePurchaseOrderCommand): Promise<PurchaseOrder> {
    this.logger.info(`Executing ${CreatePurchaseOrderCommand.name}`);

    const result = await this.poRepo.createWithItemsAsync(command);
    this.activityLog.record({
      action: EActivityAction.PurchaseOrderCreated,
      entityType: 'PurchaseOrder',
      entityId: result.id,
      actorId: command.createdById,
      organizationId: command.organizationId,
      metadata: { poNumber: result.poNumber, totalAmount: result.totalAmount },
    });
    return result;
  }
}
