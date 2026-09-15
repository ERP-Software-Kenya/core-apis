import { BadRequestException, Inject, NotFoundException } from '@nestjs/common';
import { ICommandHandler } from '@nestjs/cqrs';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { CommandHandlerStrict } from '../../../../../common';
import { EPurchaseReturnDispatchStatus, EPurchaseReturnItemSourceType, EPurchaseReturnStatus } from '../../../../../infrastructure/persistence/entities';
import { PURCHASE_ITEM_ALLOCATION_REPO, PURCHASE_ITEM_REPO, PURCHASE_ORDER_REPO, PURCHASE_RETURN_ITEM_REPO, PURCHASE_RETURN_REPO } from '../../../../constants';
import { generateReturnNumber } from '../../../../shared/helpers/return-number';
import { IPurchaseItemRepo } from '../../../purchase-items';
import { PurchaseItem } from '../../../purchase-items/domain';
import { PurchaseItemAllocation, PurchaseOrder } from '../../../purchase-orders/domain';
import { IPurchaseItemAllocationRepo, IPurchaseOrderRepo } from '../../../purchase-orders';
import { PurchaseReturn, PurchaseReturnItem } from '../../domain';
import { applyPurchaseReturnTotals } from '../../helpers';
import { IPurchaseReturnItemRepo, IPurchaseReturnRepo } from '../../index';
import { CreatePurchaseReturnCommand } from './create-purchase-return.command';

@CommandHandlerStrict(CreatePurchaseReturnCommand)
export class CreatePurchaseReturnCommandHandler implements ICommandHandler<CreatePurchaseReturnCommand, PurchaseReturn> {
  constructor(
    @Inject(PURCHASE_ORDER_REPO) private readonly poRepo: IPurchaseOrderRepo,
    @Inject(PURCHASE_ITEM_REPO) private readonly itemRepo: IPurchaseItemRepo,
    @Inject(PURCHASE_ITEM_ALLOCATION_REPO) private readonly allocationRepo: IPurchaseItemAllocationRepo,
    @Inject(PURCHASE_RETURN_REPO) private readonly returnRepo: IPurchaseReturnRepo,
    @Inject(PURCHASE_RETURN_ITEM_REPO) private readonly returnItemRepo: IPurchaseReturnItemRepo,
    @InjectPinoLogger(CreatePurchaseReturnCommandHandler.name) private readonly logger: PinoLogger,
  ) {}

  public async execute(command: CreatePurchaseReturnCommand): Promise<PurchaseReturn> {
    this.logger.info(`Executing ${CreatePurchaseReturnCommand.name} poId=${command.purchaseOrderId}`);
    const po = await this.loadPurchaseOrder(command.purchaseOrderId, command.organizationId);
    const items = await this.buildItems(po, command.items ?? []);

    const ret = new PurchaseReturn();
    ret.returnNumber    = generateReturnNumber('PR');
    ret.organizationId  = po.organizationId;
    ret.purchaseOrderId = po.id;
    ret.supplierId      = po.supplierId;
    ret.status          = EPurchaseReturnStatus.Draft;
    ret.dispatchStatus  = EPurchaseReturnDispatchStatus.PendingDispatch;
    ret.reason          = command.reason;
    ret.notes           = command.notes;
    ret.createdById     = command.createdById;
    ret.items           = items;
    applyPurchaseReturnTotals(ret);
    return this.returnRepo.createAsync(ret);
  }

  private async loadPurchaseOrder(id: string, organizationId: string): Promise<PurchaseOrder> {
    const po = await this.poRepo.getAsync(id);
    if (!po) throw new NotFoundException(`Purchase order ${id} not found`);
    if (po.organizationId !== organizationId) throw new BadRequestException('Purchase order does not belong to the current organization');
    return po;
  }

  private async buildItems(po: PurchaseOrder, requested: CreatePurchaseReturnCommand['items']): Promise<PurchaseReturnItem[]> {
    if (!requested?.length) throw new BadRequestException('At least one return item is required');
    const poItems = await this.itemRepo.allAsync({ purchaseOrderId: po.id });
    const itemMap = new Map(poItems.map((item) => [item.id, item]));
    const seen = new Set<string>();

    return Promise.all(requested.map(async (input) => {
      const duplicateKey = `${input.purchaseItemId}:${input.sourceType}:${input.locationId ?? ''}`;
      if (seen.has(duplicateKey)) throw new BadRequestException(`Duplicate return line for purchase item ${input.purchaseItemId}`);
      seen.add(duplicateKey);
      const source = itemMap.get(input.purchaseItemId);
      if (!source) throw new BadRequestException(`Purchase item ${input.purchaseItemId} is not part of purchase order ${po.id}`);
      const quantity = Number(input.quantity);
      if (!Number.isFinite(quantity) || quantity <= 0) throw new BadRequestException('Return quantity must be greater than zero');
      await this.assertReturnable(source, input.sourceType, quantity, input.locationId);
      const item = new PurchaseReturnItem();
      item.purchaseItemId = source.id;
      item.productId = source.productId;
      item.quantity = quantity;
      item.unitCost = Number(source.unitCost);
      item.sourceType = input.sourceType;
      item.locationId = input.locationId;
      item.reason = input.reason;
      return item;
    }));
  }

  private async assertReturnable(source: PurchaseItem, sourceType: EPurchaseReturnItemSourceType, quantity: number, locationId?: string): Promise<void> {
    if (sourceType === EPurchaseReturnItemSourceType.AllocatedStock && !locationId) {
      throw new BadRequestException('Location is required for allocated stock returns');
    }
    if (sourceType === EPurchaseReturnItemSourceType.UnallocatedReceived && locationId) {
      throw new BadRequestException('Location is not allowed for unallocated received returns');
    }

    if (sourceType === EPurchaseReturnItemSourceType.UnallocatedReceived) {
      const maxUnallocated = Number(source.quantityReceived ?? 0) - Number(source.quantityAllocated ?? 0);
      if (quantity > maxUnallocated) throw new BadRequestException(`Cannot return ${quantity} unallocated units. Returnable quantity is ${maxUnallocated}`);
      return;
    }

    const allocatedAtLocation = await this.allocatedAtLocation(source.id, locationId);
    const returnedAtLocation = await this.returnItemRepo.sumFinalizedAllocatedQuantityByPurchaseItemLocationAsync(source.id, locationId);
    const maxAllocated = allocatedAtLocation - returnedAtLocation;
    if (quantity > maxAllocated) throw new BadRequestException(`Cannot return ${quantity} allocated units at this location. Returnable quantity is ${maxAllocated}`);
  }

  private async allocatedAtLocation(purchaseItemId: string, locationId: string): Promise<number> {
    const allocations = await this.allocationRepo.allAsync({ purchaseItemId });
    return allocations
      .filter((allocation: PurchaseItemAllocation) => allocation.locationId === locationId)
      .reduce((acc, allocation) => acc + Number(allocation.quantity), 0);
  }
}
