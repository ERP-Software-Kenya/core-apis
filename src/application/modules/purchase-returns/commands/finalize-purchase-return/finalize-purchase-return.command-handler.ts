import { BadRequestException, Inject, NotFoundException } from '@nestjs/common';
import { ICommandHandler } from '@nestjs/cqrs';
import { InjectDataSource } from '@nestjs/typeorm';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { DataSource, EntityManager } from 'typeorm';
import { CommandHandlerStrict } from '../../../../../common';
import {
  EMovementType,
  EPurchaseReturnItemSourceType,
  EPurchaseReturnStatus,
  InventoryEntity,
  PurchaseItemEntity,
  PurchaseReturnEntity,
  PurchaseReturnItemEntity,
  StockMovementEntity,
} from '../../../../../infrastructure/persistence/entities';
import { INVENTORY_REPO, PURCHASE_ITEM_ALLOCATION_REPO, PURCHASE_RETURN_ITEM_REPO, PURCHASE_RETURN_REPO } from '../../../../constants';
import { IInventoryRepo } from '../../../inventory';
import { IPurchaseItemAllocationRepo } from '../../../purchase-orders';
import { IPurchaseReturnItemRepo, IPurchaseReturnRepo } from '../../index';
import { PurchaseReturn } from '../../domain';
import { FinalizePurchaseReturnCommand } from './finalize-purchase-return.command';

@CommandHandlerStrict(FinalizePurchaseReturnCommand)
export class FinalizePurchaseReturnCommandHandler implements ICommandHandler<FinalizePurchaseReturnCommand, PurchaseReturn> {
  constructor(
    @Inject(PURCHASE_RETURN_REPO) private readonly repo: IPurchaseReturnRepo,
    @Inject(PURCHASE_RETURN_ITEM_REPO) private readonly returnItemRepo: IPurchaseReturnItemRepo,
    @Inject(PURCHASE_ITEM_ALLOCATION_REPO) private readonly allocationRepo: IPurchaseItemAllocationRepo,
    @Inject(INVENTORY_REPO) private readonly inventoryRepo: IInventoryRepo,
    @InjectDataSource() private readonly dataSource: DataSource,
    @InjectPinoLogger(FinalizePurchaseReturnCommandHandler.name) private readonly logger: PinoLogger,
  ) {}

  public async execute(command: FinalizePurchaseReturnCommand): Promise<PurchaseReturn> {
    this.logger.info(`Executing ${FinalizePurchaseReturnCommand.name} id=${command.id}`);
    await this.dataSource.transaction(async (manager) => {
      const ret = await manager.findOne(PurchaseReturnEntity, {
        where: { id: command.id },
        relations: { items: true },
        lock: { mode: 'pessimistic_write' },
      });
      if (!ret) throw new NotFoundException(`Purchase return ${command.id} not found`);
      if (ret.status === EPurchaseReturnStatus.Finalized) return;
      if (ret.status === EPurchaseReturnStatus.Cancelled) throw new BadRequestException('Cancelled purchase returns cannot be finalized');
      if (!ret.items?.length) throw new BadRequestException('At least one return item is required');

      for (const item of ret.items) {
        if (item.sourceType === EPurchaseReturnItemSourceType.UnallocatedReceived) {
          await this.finalizeUnallocated(item, manager);
        } else {
          await this.finalizeAllocated(ret, item, command.performedById, manager);
        }
      }

      ret.status = EPurchaseReturnStatus.Finalized;
      ret.finalizedById = command.performedById;
      ret.finalizedAt = new Date();
      await manager.save(PurchaseReturnEntity, ret);
    });
    return this.repo.getWithItemsAsync(command.id);
  }

  private async finalizeUnallocated(item: PurchaseReturnItemEntity, manager: EntityManager): Promise<void> {
    if (item.locationId) throw new BadRequestException('Location is not allowed for unallocated received returns');
    const source = await manager.findOne(PurchaseItemEntity, { where: { id: item.purchaseItemId }, lock: { mode: 'pessimistic_write' } });
    if (!source) throw new NotFoundException(`Purchase item ${item.purchaseItemId} not found`);
    const maxReturnable = Number(source.quantityReceived ?? 0) - Number(source.quantityAllocated ?? 0);
    if (Number(item.quantity) > maxReturnable) throw new BadRequestException(`Cannot return ${item.quantity} unallocated units. Returnable quantity is ${maxReturnable}`);
    source.quantityReceived = Number(source.quantityReceived ?? 0) - Number(item.quantity);
    await manager.save(PurchaseItemEntity, source);
  }

  private async finalizeAllocated(ret: PurchaseReturnEntity, item: PurchaseReturnItemEntity, performedById: string, manager: EntityManager): Promise<void> {
    if (!item.locationId) throw new BadRequestException('Location is required for allocated stock returns');
    const source = await manager.findOne(PurchaseItemEntity, { where: { id: item.purchaseItemId } });
    if (!source) throw new NotFoundException(`Purchase item ${item.purchaseItemId} not found`);
    const allocations = await this.allocationRepo.allAsync({ purchaseItemId: item.purchaseItemId });
    const allocatedAtLocation = allocations.filter((allocation) => allocation.locationId === item.locationId).reduce((acc, allocation) => acc + Number(allocation.quantity), 0);
    const returnedAtLocation = await this.returnItemRepo.sumFinalizedAllocatedQuantityByPurchaseItemLocationAsync(item.purchaseItemId, item.locationId, ret.id);
    const maxAllocated = allocatedAtLocation - returnedAtLocation;
    if (Number(item.quantity) > maxAllocated) throw new BadRequestException(`Cannot return ${item.quantity} allocated units at this location. Returnable quantity is ${maxAllocated}`);

    const inv = await this.inventoryRepo.findByOrgLocationProductAsync(ret.organizationId, item.locationId, item.productId, manager);
    if (!inv) throw new BadRequestException(`No inventory found for product ${item.productId} at this location`);
    const before = Number(inv.quantityOnHand);
    const updated = await this.inventoryRepo.deductStockAsync(inv.id, Number(item.quantity), manager);
    await manager.save(StockMovementEntity, manager.create(StockMovementEntity, {
      inventoryId: inv.id,
      locationId: item.locationId,
      productId: item.productId,
      performedById,
      referenceId: ret.id,
      referenceType: 'purchase_return',
      movementType: EMovementType.StockOut,
      quantity: item.quantity,
      quantityBefore: before,
      quantityAfter: Number(updated.quantityOnHand),
      unitCost: item.unitCost,
      notes: `Purchase return ${ret.returnNumber}`,
    }));
  }
}
