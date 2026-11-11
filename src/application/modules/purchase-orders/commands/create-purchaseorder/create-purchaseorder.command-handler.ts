import { Inject } from '@nestjs/common';
import { ICommandHandler } from '@nestjs/cqrs';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { CommandHandlerStrict } from '../../../../../common';
import { PURCHASE_ORDER_REPO } from '../../../../constants';
import { PurchaseOrder } from '../../domain';
import { IPurchaseOrderRepo } from '../..';
import { ActivityLogService, EUnitOperation, QuantityConversionService } from 'src/application/shared';
import { EActivityAction } from 'src/infrastructure/persistence/entities/activity-log.entity';
import { CreatePurchaseOrderCommand } from './create-purchaseorder.command';

@CommandHandlerStrict(CreatePurchaseOrderCommand)
export class CreatePurchaseOrderCommandHandler implements ICommandHandler<CreatePurchaseOrderCommand, PurchaseOrder> {
  constructor(
    @Inject(PURCHASE_ORDER_REPO) private readonly poRepo: IPurchaseOrderRepo,
    private readonly activityLog: ActivityLogService,
    private readonly quantityConversion: QuantityConversionService,
    @InjectPinoLogger(CreatePurchaseOrderCommandHandler.name) private readonly logger: PinoLogger,
  ) {}

  public async execute(command: CreatePurchaseOrderCommand): Promise<PurchaseOrder> {
    this.logger.info(`Executing ${CreatePurchaseOrderCommand.name}`);

    const items = await Promise.all(command.items.map(async (item) => {
      if (!item.productUnitId) return item;
      const converted = await this.quantityConversion.convert({
        organizationId: command.organizationId, productId: item.productId,
        productUnitId: item.productUnitId, quantity: item.quantityOrdered,
        operation: EUnitOperation.Purchase,
      });
      return {
        ...item, ...converted,
        quantityOrdered: Number(converted.baseQuantity),
        selectedUnitCost: item.unitCost,
        unitCost: item.unitCost / Number(converted.conversionFactorSnapshot),
      };
    }));
    const result = await this.poRepo.createWithItemsAsync({ ...command, items });
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
