import { BadRequestException, Inject } from '@nestjs/common';
import { ICommandHandler } from '@nestjs/cqrs';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { CommandHandlerStrict } from '../../../../../common';
import { INVENTORY_REPO, PURCHASE_ITEM_REPO, PURCHASE_ORDER_REPO } from '../../../../constants';
import { PurchaseOrder } from '../../domain';
import { IPurchaseOrderRepo } from '../..';
import { IPurchaseItemRepo } from '../../../purchase-items/i-purchase-item.repo';
import { IInventoryRepo } from '../../../inventory/i-inventory.repo';
import { Inventory } from '../../../inventory/domain';
import { StockOrchestrationService } from 'src/application/shared';
import { EPurchaseOrderStatus } from 'src/application/shared/enums';
import { ReceivePurchaseOrderCommand } from './receive-purchaseorder.command';

@CommandHandlerStrict(ReceivePurchaseOrderCommand)
export class ReceivePurchaseOrderCommandHandler implements ICommandHandler<ReceivePurchaseOrderCommand, PurchaseOrder> {
  constructor(
    @Inject(PURCHASE_ORDER_REPO) private readonly poRepo: IPurchaseOrderRepo,
    @Inject(PURCHASE_ITEM_REPO) private readonly itemRepo: IPurchaseItemRepo,
    @Inject(INVENTORY_REPO) private readonly inventoryRepo: IInventoryRepo,
    private readonly orchestrator: StockOrchestrationService,
    @InjectPinoLogger(ReceivePurchaseOrderCommandHandler.name) private readonly logger: PinoLogger,
  ) {}

  public async execute(command: ReceivePurchaseOrderCommand): Promise<PurchaseOrder> {
    this.logger.info(`Executing ${ReceivePurchaseOrderCommand.name} poId=${command.purchaseOrderId}`);

    const po = await this.poRepo.getAsync(command.purchaseOrderId);

    if (po.status === EPurchaseOrderStatus.Received || po.status === EPurchaseOrderStatus.Cancelled) {
      throw new BadRequestException(`Cannot receive a purchase order with status "${po.status}"`);
    }

    for (const recv of command.items) {
      const item = await this.itemRepo.getAsync(recv.purchaseItemId);

      const existing = await this.inventoryRepo.allAsync({
        organizationId: command.organizationId,
        locationId:     command.locationId,
        productId:      item.productId,
      });

      let inv = existing[0];
      if (!inv) {
        const newInv          = new Inventory();
        newInv.organizationId = command.organizationId;
        newInv.locationId     = command.locationId;
        newInv.productId      = item.productId;
        newInv.quantityOnHand   = 0;
        newInv.quantityReserved = 0;
        newInv.reorderLevel     = 0;
        inv = await this.inventoryRepo.createAsync(newInv);
      }

      await this.orchestrator.addStock({
        inventoryId:   inv.id,
        organizationId: command.organizationId,
        locationId:    command.locationId,
        productId:     item.productId,
        quantity:      recv.quantityReceived,
        unitCost:      item.unitCost,
        referenceId:   command.purchaseOrderId,
        referenceType: 'purchase_order',
        performedById: command.performedById,
        notes:         command.notes,
      });

      item.quantityReceived = (item.quantityReceived ?? 0) + recv.quantityReceived;
      await this.itemRepo.updateAsync(item);
    }

    const allItems   = await this.itemRepo.allAsync({ purchaseOrderId: command.purchaseOrderId });
    const allDone    = allItems.every(i => (i.quantityReceived ?? 0) >= i.quantityOrdered);
    const anyDone    = allItems.some(i => (i.quantityReceived ?? 0) > 0);

    if (allDone) {
      po.status     = EPurchaseOrderStatus.Received;
      po.receivedAt = new Date();
    } else if (anyDone) {
      po.status = EPurchaseOrderStatus.PartiallyReceived;
    }

    return this.poRepo.updateAsync(po);
  }
}
