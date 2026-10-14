import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';
import {
  IAddUnpublishedStockOperation,
  IAdjustStockOperation,
  IPublishStockOperation,
  IStockOperation,
  IStockOperationsRepo,
  ITransferStockOperation,
  TransferStockOperationInput,
} from '../../../application/shared';
import { EStockTransferStatus } from '../../../application/shared/enums/e-stock-transfer-status';
import {
  EMovementType,
  EProductLogAction,
  EUnpublishedMovementType,
  InventoryEntity,
  ProductLogEntity,
  StockMovementEntity,
  StockTransferEntity,
  UnpublishedStockEntity,
  UnpublishedStockMovementEntity,
} from '../entities';

type OfficialMutation = 'add' | 'remove' | 'reserve' | 'release' | 'damage' | 'write_off';

@Injectable()
export class StockOperationsRepo implements IStockOperationsRepo {
  public constructor(
    @InjectRepository(InventoryEntity)
    private readonly inventory: Repository<InventoryEntity>,
  ) {}

  public addStock(input: IStockOperation) { return this.mutateOfficial(input, 'add'); }
  public removeStock(input: IStockOperation) { return this.mutateOfficial(input, 'remove'); }
  public reserveStock(input: IStockOperation) { return this.mutateOfficial(input, 'reserve'); }
  public releaseReservation(input: IStockOperation) { return this.mutateOfficial(input, 'release'); }
  public damageStock(input: IStockOperation) { return this.mutateOfficial(input, 'damage'); }
  public writeOffStock(input: IStockOperation) { return this.mutateOfficial(input, 'write_off'); }

  public async adjustStock(input: IAdjustStockOperation): Promise<void> {
    if (!Number.isFinite(input.absoluteQuantity) || input.absoluteQuantity < 0) {
      throw new BadRequestException('Absolute quantity must be zero or greater');
    }
    await this.inventory.manager.transaction(async (manager) => {
      const stock = await this.lockOfficial(manager, input);
      if (input.absoluteQuantity < Number(stock.quantityReserved)) {
        throw new BadRequestException('Adjusted quantity cannot be below reserved quantity');
      }
      const before = Number(stock.quantityOnHand);
      stock.quantityOnHand = input.absoluteQuantity;
      if (input.unitCost != null) stock.averageCost = input.unitCost;
      await manager.save(stock);
      const operation: IStockOperation = {
        ...input,
        quantity: Math.abs(input.absoluteQuantity - before),
      };
      await this.officialMovement(manager, operation, EMovementType.Adjustment, before, stock.quantityOnHand);
      await this.audit(manager, operation, EProductLogAction.StockAdjusted, input.absoluteQuantity);
    });
  }

  public async addUnpublishedStock(input: IAddUnpublishedStockOperation): Promise<void> {
    this.assertPositive(input.quantity);
    await this.inventory.manager.transaction(async (manager) => {
      const stock = await this.lockOrCreateBlack(manager, input.organizationId, input.locationId, input.productId);
      const before = Number(stock.quantityOnHand);
      const after = before + input.quantity;
      stock.averageCost = this.averageCost(before, Number(stock.averageCost ?? 0), input.quantity, input.unitCost);
      stock.quantityOnHand = after;
      await manager.save(stock);
      await manager.save(UnpublishedStockMovementEntity, manager.create(UnpublishedStockMovementEntity, {
        unpublishedStockId: stock.id, locationId: input.locationId, productId: input.productId,
        performedById: input.performedById, movementType: EUnpublishedMovementType.StockIn,
        quantity: input.quantity, quantityBefore: before, quantityAfter: after,
        unitCost: input.unitCost, notes: input.notes,
      }));
      await this.audit(manager, { ...input, inventoryId: stock.id }, EProductLogAction.StockAdded, input.quantity, { isUnpublished: true });
    });
  }

  public async publishStock(input: IPublishStockOperation): Promise<void> {
    this.assertPositive(input.quantity);
    await this.inventory.manager.transaction(async (manager) => {
      const black = await manager.findOne(UnpublishedStockEntity, {
        where: { id: input.unpublishedStockId, organizationId: input.organizationId },
        lock: { mode: 'pessimistic_write' },
      });
      if (!black) throw new NotFoundException('Unpublished stock not found');
      if (input.quantity > Number(black.quantityOnHand)) {
        throw new BadRequestException(`Cannot publish more than available stock: ${black.quantityOnHand}`);
      }
      const official = await this.lockOrCreateOfficial(manager, black.organizationId, black.locationId, black.productId);
      const blackBefore = Number(black.quantityOnHand);
      const officialBefore = Number(official.quantityOnHand);
      black.quantityOnHand = blackBefore - input.quantity;
      official.quantityOnHand = officialBefore + input.quantity;
      official.averageCost = this.averageCost(
        officialBefore,
        Number(official.averageCost ?? 0),
        input.quantity,
        black.averageCost == null ? undefined : Number(black.averageCost),
      );
      await manager.save([black, official]);
      await manager.save(UnpublishedStockMovementEntity, manager.create(UnpublishedStockMovementEntity, {
        unpublishedStockId: black.id, locationId: black.locationId, productId: black.productId,
        performedById: input.performedById, movementType: EUnpublishedMovementType.TransferOut,
        quantity: input.quantity, quantityBefore: blackBefore, quantityAfter: black.quantityOnHand,
        notes: input.notes,
      }));
      await this.officialMovement(manager, {
        inventoryId: official.id, organizationId: black.organizationId, locationId: black.locationId,
        productId: black.productId, quantity: input.quantity, performedById: input.performedById,
        notes: input.notes,
      }, EMovementType.Published, officialBefore, official.quantityOnHand);
      await this.audit(manager, {
        inventoryId: official.id, organizationId: black.organizationId, locationId: black.locationId,
        productId: black.productId, quantity: input.quantity, performedById: input.performedById,
      }, EProductLogAction.StockPublished, input.quantity);
    });
  }

  public async transferStock(input: ITransferStockOperation): Promise<void> {
    await this.inventory.manager.transaction((manager) => this.transfer(manager, input));
  }

  public async completeTransferBatch(transferId: string, inputs: TransferStockOperationInput[]): Promise<void> {
    await this.inventory.manager.transaction(async (manager) => {
      const transfer = await manager.findOne(StockTransferEntity, {
        where: { id: transferId }, lock: { mode: 'pessimistic_write' },
      });
      if (!transfer) throw new NotFoundException(`Stock transfer ${transferId} not found`);
      if (inputs.some((input) => input.organizationId !== transfer.organizationId)) {
        throw new BadRequestException('Transfer batch contains an invalid organization');
      }
      for (const input of inputs) await this.transfer(manager, input);
      transfer.status = EStockTransferStatus.Completed;
      await manager.save(transfer);
    });
  }

  private async mutateOfficial(input: IStockOperation, mutation: OfficialMutation): Promise<void> {
    this.assertPositive(input.quantity);
    await this.inventory.manager.transaction(async (manager) => {
      const stock = await this.lockOfficial(manager, input);
      const onHand = Number(stock.quantityOnHand);
      const reserved = Number(stock.quantityReserved);
      let before = onHand;
      let after = onHand;
      let movement: EMovementType;
      let action: EProductLogAction;
      if (mutation === 'add') {
        after = onHand + input.quantity;
        stock.averageCost = this.averageCost(onHand, Number(stock.averageCost ?? 0), input.quantity, input.unitCost);
        stock.quantityOnHand = after; movement = EMovementType.StockIn; action = EProductLogAction.StockAdded;
      } else if (mutation === 'reserve') {
        if (input.quantity > onHand - reserved) throw new BadRequestException(`Insufficient stock to reserve. Available: ${onHand - reserved}`);
        before = reserved; after = reserved + input.quantity; stock.quantityReserved = after;
        movement = EMovementType.Reserved; action = EProductLogAction.StockReserved;
      } else if (mutation === 'release') {
        if (input.quantity > reserved) throw new BadRequestException(`Cannot release more than reserved: ${reserved}`);
        before = reserved; after = reserved - input.quantity; stock.quantityReserved = after;
        movement = EMovementType.ReservationReleased; action = EProductLogAction.StockReservationReleased;
      } else {
        if (input.quantity > onHand - reserved) throw new BadRequestException(`Insufficient available stock. Available: ${onHand - reserved}`);
        after = onHand - input.quantity; stock.quantityOnHand = after;
        movement = mutation === 'damage' ? EMovementType.Damage : mutation === 'write_off' ? EMovementType.WriteOff : EMovementType.StockOut;
        action = mutation === 'damage' ? EProductLogAction.StockDamaged : mutation === 'write_off' ? EProductLogAction.StockWrittenOff : EProductLogAction.StockRemoved;
      }
      await manager.save(stock);
      await this.officialMovement(manager, input, movement, before, after);
      await this.audit(manager, input, action, input.quantity);
    });
  }

  private async transfer(manager: EntityManager, input: ITransferStockOperation): Promise<void> {
    this.assertPositive(input.quantity);
    const source = await this.lockOfficial(manager, {
      inventoryId: input.fromInventoryId, organizationId: input.organizationId,
    });
    if (source.productId !== input.productId || source.locationId !== input.fromLocationId) {
      throw new BadRequestException('Source inventory does not match the transfer request');
    }
    const destination = input.toInventoryId
      ? await this.lockOfficial(manager, { inventoryId: input.toInventoryId, organizationId: input.organizationId })
      : await this.lockOrCreateOfficial(manager, input.organizationId, input.toLocationId, input.productId);
    if (destination.productId !== input.productId || destination.locationId !== input.toLocationId) {
      throw new BadRequestException('Destination inventory does not match the transfer request');
    }
    const sourceBefore = Number(source.quantityOnHand);
    if (input.quantity > sourceBefore - Number(source.quantityReserved)) throw new BadRequestException('Insufficient transferable stock');
    const destinationBefore = Number(destination.quantityOnHand);
    source.quantityOnHand = sourceBefore - input.quantity;
    destination.quantityOnHand = destinationBefore + input.quantity;
    await manager.save([source, destination]);
    const common = { organizationId: input.organizationId, productId: input.productId, quantity: input.quantity, performedById: input.performedById, referenceId: input.referenceId, notes: input.notes };
    await this.officialMovement(manager, { ...common, inventoryId: source.id, locationId: input.fromLocationId }, EMovementType.TransferOut, sourceBefore, source.quantityOnHand);
    await this.officialMovement(manager, { ...common, inventoryId: destination.id, locationId: input.toLocationId }, EMovementType.TransferIn, destinationBefore, destination.quantityOnHand);
    await this.audit(manager, { ...common, inventoryId: source.id, locationId: input.fromLocationId }, EProductLogAction.StockTransferredOut, input.quantity);
    await this.audit(manager, { ...common, inventoryId: destination.id, locationId: input.toLocationId }, EProductLogAction.StockTransferredIn, input.quantity);
  }

  private lockOfficial(manager: EntityManager, input: { inventoryId: string; organizationId: string }) {
    return manager.findOneOrFail(InventoryEntity, { where: { id: input.inventoryId, organizationId: input.organizationId }, lock: { mode: 'pessimistic_write' } });
  }

  private async lockOrCreateOfficial(manager: EntityManager, organizationId: string, locationId: string, productId: string) {
    await manager.query('SELECT pg_advisory_xact_lock(hashtext($1))', [`inventory:${organizationId}:${locationId}:${productId}`]);
    let stock = await manager.findOne(InventoryEntity, { where: { organizationId, locationId, productId }, lock: { mode: 'pessimistic_write' } });
    if (!stock) stock = await manager.save(InventoryEntity, manager.create(InventoryEntity, { organizationId, locationId, productId, quantityOnHand: 0, quantityReserved: 0, reorderLevel: 0 }));
    return stock;
  }

  private async lockOrCreateBlack(manager: EntityManager, organizationId: string, locationId: string, productId: string) {
    await manager.query('SELECT pg_advisory_xact_lock(hashtext($1))', [`black-stock:${organizationId}:${locationId}:${productId}`]);
    let stock = await manager.findOne(UnpublishedStockEntity, { where: { organizationId, locationId, productId }, lock: { mode: 'pessimistic_write' } });
    if (!stock) stock = await manager.save(UnpublishedStockEntity, manager.create(UnpublishedStockEntity, { organizationId, locationId, productId, quantityOnHand: 0 }));
    return stock;
  }

  private officialMovement(manager: EntityManager, input: IStockOperation, movementType: EMovementType, quantityBefore: number, quantityAfter: number) {
    return manager.save(StockMovementEntity, manager.create(StockMovementEntity, {
      inventoryId: input.inventoryId, locationId: input.locationId, productId: input.productId,
      performedById: input.performedById, referenceId: input.referenceId, referenceType: input.referenceType,
      movementType, quantity: input.quantity, quantityBefore, quantityAfter, unitCost: input.unitCost, notes: input.notes,
    }));
  }

  private audit(manager: EntityManager, input: Omit<IStockOperation, 'quantity'> & { quantity?: number }, action: EProductLogAction, quantity: number, extra?: Record<string, unknown>) {
    return manager.save(ProductLogEntity, manager.create(ProductLogEntity, {
      organizationId: input.organizationId, productId: input.productId, inventoryId: input.inventoryId,
      locationId: input.locationId, performedById: input.performedById, action,
      metadata: { quantity, referenceId: input.referenceId, ...extra },
    }));
  }

  private assertPositive(quantity: number): void {
    if (!Number.isFinite(quantity) || quantity <= 0) throw new BadRequestException('Quantity must be greater than 0');
  }

  private averageCost(currentQuantity: number, currentCost: number, addedQuantity: number, addedCost?: number): number {
    if (addedCost == null) return currentCost;
    const total = currentQuantity + addedQuantity;
    return total > 0 ? (currentQuantity * currentCost + addedQuantity * addedCost) / total : addedCost;
  }
}
