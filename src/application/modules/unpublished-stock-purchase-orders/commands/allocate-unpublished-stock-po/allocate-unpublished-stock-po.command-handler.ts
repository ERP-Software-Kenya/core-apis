import { BadRequestException, Inject } from '@nestjs/common';
import { ICommandHandler } from '@nestjs/cqrs';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { CommandHandlerStrict } from '../../../../../common';
import {
  UNPUBLISHED_STOCK_PO_REPO,
  UNPUBLISHED_STOCK_PI_REPO,
  UNPUBLISHED_STOCK_PI_ALLOCATION_REPO,
} from '../../../../constants';
import { UnpublishedStockPurchaseOrder, UnpublishedStockPurchaseItemAllocation } from '../../domain';
import { IUnpublishedStockPORepo } from '../../i-unpublished-stock-po.repo';
import { IUnpublishedStockPIRepo } from '../../i-unpublished-stock-pi.repo';
import { IUnpublishedStockPIAllocationRepo } from '../../i-unpublished-stock-pi-allocation.repo';
import { StockOrchestrationService } from 'src/application/shared';
import { EPurchaseOrderStatus } from 'src/application/shared/enums';
import { AllocateUnpublishedStockPOCommand } from './allocate-unpublished-stock-po.command';

const ALLOWED_STATUSES: EPurchaseOrderStatus[] = [
  EPurchaseOrderStatus.PartiallyReceived,
  EPurchaseOrderStatus.Received,
  EPurchaseOrderStatus.PartiallyAllocated,
];

@CommandHandlerStrict(AllocateUnpublishedStockPOCommand)
export class AllocateUnpublishedStockPOCommandHandler
  implements ICommandHandler<AllocateUnpublishedStockPOCommand, UnpublishedStockPurchaseOrder>
{
  constructor(
    @Inject(UNPUBLISHED_STOCK_PO_REPO) private readonly poRepo: IUnpublishedStockPORepo,
    @Inject(UNPUBLISHED_STOCK_PI_REPO) private readonly itemRepo: IUnpublishedStockPIRepo,
    @Inject(UNPUBLISHED_STOCK_PI_ALLOCATION_REPO) private readonly allocationRepo: IUnpublishedStockPIAllocationRepo,
    private readonly orchestrator: StockOrchestrationService,
    @InjectPinoLogger(AllocateUnpublishedStockPOCommandHandler.name) private readonly logger: PinoLogger,
  ) {}

  public async execute(command: AllocateUnpublishedStockPOCommand): Promise<UnpublishedStockPurchaseOrder> {
    this.logger.info(`Executing ${AllocateUnpublishedStockPOCommand.name} poId=${command.purchaseOrderId}`);
    const po = await this.poRepo.getAsync(command.purchaseOrderId);

    if (!ALLOWED_STATUSES.includes(po.status)) {
      throw new BadRequestException(
        `Cannot allocate stock for a purchase order with status "${po.status}". Items must be received first.`,
      );
    }

    for (const alloc of command.allocations) {
      const item           = await this.itemRepo.getAsync(alloc.purchaseItemId);
      const maxAllocatable = Number(item.quantityReceived ?? 0) - Number(item.quantityAllocated ?? 0);

      if (Number(alloc.quantity) > maxAllocatable) {
        throw new BadRequestException(
          `Cannot allocate ${alloc.quantity} units for item ${alloc.purchaseItemId}. ` +
          `Only ${maxAllocatable} units available (received: ${item.quantityReceived}, already allocated: ${item.quantityAllocated}).`,
        );
      }

      await this.orchestrator.addUnpublishedStock({
        organizationId: command.organizationId,
        locationId:     alloc.locationId,
        productId:      item.productId,
        quantity:       alloc.quantity,
        unitCost:       item.unitCost,
        performedById:  command.performedById,
        notes:          command.notes,
      });

      const record          = new UnpublishedStockPurchaseItemAllocation();
      record.organizationId = command.organizationId;
      record.purchaseOrderId = command.purchaseOrderId;
      record.purchaseItemId = alloc.purchaseItemId;
      record.locationId     = alloc.locationId;
      record.quantity       = alloc.quantity;
      record.performedById  = command.performedById;
      record.notes          = command.notes;
      await this.allocationRepo.createAsync(record);

      item.quantityAllocated = Number(item.quantityAllocated ?? 0) + Number(alloc.quantity);
      await this.itemRepo.updateAsync(item);
    }

    const allItems          = await this.itemRepo.allAsync({ purchaseOrderId: command.purchaseOrderId });
    const anyAllocated      = allItems.some(ii => Number(ii.quantityAllocated ?? 0) > 0);
    const allFullyAllocated = allItems.every(
      ii => Number(ii.quantityAllocated ?? 0) >= Number(ii.quantityReceived ?? 0) && Number(ii.quantityReceived ?? 0) > 0,
    );

    if (allFullyAllocated) {
      po.status = EPurchaseOrderStatus.Allocated;
    } else if (anyAllocated) {
      po.status = EPurchaseOrderStatus.PartiallyAllocated;
    }

    return this.poRepo.updateAsync(po);
  }
}
