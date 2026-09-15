import { BadRequestException, Inject, NotFoundException } from '@nestjs/common';
import { ICommandHandler } from '@nestjs/cqrs';
import { InjectDataSource } from '@nestjs/typeorm';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { DataSource } from 'typeorm';
import { CommandHandlerStrict } from '../../../../../common';
import { EPurchaseReturnItemSourceType, EPurchaseReturnStatus, PurchaseReturnEntity, PurchaseReturnItemEntity } from '../../../../../infrastructure/persistence/entities';
import { PURCHASE_ITEM_ALLOCATION_REPO, PURCHASE_ITEM_REPO, PURCHASE_RETURN_ITEM_REPO, PURCHASE_RETURN_REPO } from '../../../../constants';
import { IPurchaseItemRepo } from '../../../purchase-items';
import { PurchaseItem } from '../../../purchase-items/domain';
import { IPurchaseItemAllocationRepo } from '../../../purchase-orders';
import { PurchaseReturn, PurchaseReturnItem } from '../../domain';
import { applyPurchaseReturnTotals } from '../../helpers';
import { IPurchaseReturnItemRepo, IPurchaseReturnRepo } from '../../index';
import { UpdatePurchaseReturnCommand } from './update-purchase-return.command';

@CommandHandlerStrict(UpdatePurchaseReturnCommand)
export class UpdatePurchaseReturnCommandHandler implements ICommandHandler<UpdatePurchaseReturnCommand, PurchaseReturn> {
  constructor(
    @Inject(PURCHASE_RETURN_REPO) private readonly repo: IPurchaseReturnRepo,
    @Inject(PURCHASE_RETURN_ITEM_REPO) private readonly returnItemRepo: IPurchaseReturnItemRepo,
    @Inject(PURCHASE_ITEM_REPO) private readonly itemRepo: IPurchaseItemRepo,
    @Inject(PURCHASE_ITEM_ALLOCATION_REPO) private readonly allocationRepo: IPurchaseItemAllocationRepo,
    @InjectDataSource() private readonly dataSource: DataSource,
    @InjectPinoLogger(UpdatePurchaseReturnCommandHandler.name) private readonly logger: PinoLogger,
  ) {}

  public async execute(command: UpdatePurchaseReturnCommand): Promise<PurchaseReturn> {
    this.logger.info(`Executing ${UpdatePurchaseReturnCommand.name} id=${command.id}`);
    const existing = await this.repo.getWithItemsAsync(command.id);
    if (!existing) throw new NotFoundException(`Purchase return ${command.id} not found`);
    if (existing.status !== EPurchaseReturnStatus.Draft) throw new BadRequestException('Only draft purchase returns can be updated');

    const replacementItems = command.items ? await this.buildItems(existing, command.items) : undefined;
    if (replacementItems) {
      existing.items = replacementItems;
      applyPurchaseReturnTotals(existing);
    }

    await this.dataSource.transaction(async (manager) => {
      await manager.update(PurchaseReturnEntity, { id: command.id }, {
        reason: command.reason,
        notes: command.notes,
        ...(replacementItems && { totalAmount: existing.totalAmount }),
        updatedAt: new Date(),
      });
      if (replacementItems) {
        await manager.delete(PurchaseReturnItemEntity, { purchaseReturnId: command.id });
        await manager.save(
          PurchaseReturnItemEntity,
          replacementItems.map((item) => manager.create(PurchaseReturnItemEntity, { ...item, purchaseReturnId: command.id })),
        );
      }
    });
    return this.repo.getWithItemsAsync(command.id);
  }

  private async buildItems(existing: PurchaseReturn, requested: UpdatePurchaseReturnCommand['items']): Promise<PurchaseReturnItem[]> {
    if (!requested?.length) throw new BadRequestException('At least one return item is required');
    const sourceItems = await this.itemRepo.allAsync({ purchaseOrderId: existing.purchaseOrderId });
    const itemMap = new Map(sourceItems.map((item) => [item.id, item]));
    const seen = new Set<string>();
    return Promise.all(requested.map(async (input) => {
      const duplicateKey = `${input.purchaseItemId}:${input.sourceType}:${input.locationId ?? ''}`;
      if (seen.has(duplicateKey)) throw new BadRequestException(`Duplicate return line for purchase item ${input.purchaseItemId}`);
      seen.add(duplicateKey);
      const source = itemMap.get(input.purchaseItemId);
      if (!source) throw new BadRequestException(`Purchase item ${input.purchaseItemId} is not part of purchase order ${existing.purchaseOrderId}`);
      const quantity = Number(input.quantity);
      if (!Number.isFinite(quantity) || quantity <= 0) throw new BadRequestException('Return quantity must be greater than zero');
      await this.assertReturnable(source, input.sourceType, quantity, input.locationId, existing.id);
      return {
        purchaseItemId: source.id,
        productId: source.productId,
        quantity,
        unitCost: Number(source.unitCost),
        sourceType: input.sourceType,
        locationId: input.locationId,
        reason: input.reason,
      } as PurchaseReturnItem;
    }));
  }

  private async assertReturnable(
    source: PurchaseItem,
    sourceType: EPurchaseReturnItemSourceType,
    quantity: number,
    locationId?: string,
    excludeReturnId?: string,
  ): Promise<void> {
    if (sourceType === EPurchaseReturnItemSourceType.AllocatedStock && !locationId) throw new BadRequestException('Location is required for allocated stock returns');
    if (sourceType === EPurchaseReturnItemSourceType.UnallocatedReceived && locationId) throw new BadRequestException('Location is not allowed for unallocated received returns');

    if (sourceType === EPurchaseReturnItemSourceType.UnallocatedReceived) {
      const maxUnallocated = Number(source.quantityReceived ?? 0) - Number(source.quantityAllocated ?? 0);
      if (quantity > maxUnallocated) throw new BadRequestException(`Cannot return ${quantity} unallocated units. Returnable quantity is ${maxUnallocated}`);
      return;
    }

    const allocations = await this.allocationRepo.allAsync({ purchaseItemId: source.id });
    const allocatedAtLocation = allocations.filter((allocation) => allocation.locationId === locationId).reduce((acc, allocation) => acc + Number(allocation.quantity), 0);
    const returnedAtLocation = await this.returnItemRepo.sumFinalizedAllocatedQuantityByPurchaseItemLocationAsync(source.id, locationId, excludeReturnId);
    const maxAllocated = allocatedAtLocation - returnedAtLocation;
    if (quantity > maxAllocated) throw new BadRequestException(`Cannot return ${quantity} allocated units at this location. Returnable quantity is ${maxAllocated}`);
  }
}
