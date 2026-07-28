import { Inject, Injectable } from '@nestjs/common';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { DataSource } from 'typeorm';
import { InjectDataSource } from '@nestjs/typeorm';
import { EMovementType } from 'src/infrastructure/persistence/entities';
import { EProductLogAction } from '../enums/e-product-log-action.enum';
import {
  IStockOperation,
  IAdjustStockOperation,
  IPublishStockOperation,
  ITransferStockOperation,
  StockMovementInput,
} from '../interfaces/i-stock-operation.interface';
import { INVENTORY_REPO, STOCK_MOVEMENT_REPO } from '../../constants';
import { IInventoryRepo } from 'src/application/modules/inventory';
import { IStockMovementRepo } from 'src/application/modules/stock-movements';
import { ProductActivityLogger, ProductLogEntry } from './product-activity-logger.service';

@Injectable()
export class StockOrchestrationService {
  constructor(
    @Inject(INVENTORY_REPO) private readonly inventoryRepo: IInventoryRepo,
    @Inject(STOCK_MOVEMENT_REPO) private readonly movementRepo: IStockMovementRepo,
    private readonly activityLogger: ProductActivityLogger,
    @InjectDataSource() private readonly dataSource: DataSource,
    @InjectPinoLogger(StockOrchestrationService.name) private readonly logger: PinoLogger,
  ) {}

  public async addStock(input: IStockOperation): Promise<void> {
    await this.dataSource.transaction(async (manager) => {
      const inv    = await this.inventoryRepo.addStockAsync(input.inventoryId, input.quantity, input.unitCost, manager);
      const before = inv.quantityOnHand - input.quantity;
      await this.movementRepo.createWithManagerAsync(this.buildMovementInput(input, EMovementType.StockIn, before, inv.quantityOnHand, false), manager);
      await this.activityLogger.log(this.buildLogEntry(input, EProductLogAction.StockAdded, input.quantity));
      this.checkLowStock(inv.id, inv.quantityOnHand, inv.reorderLevel);
    });
  }

  public async removeStock(input: IStockOperation): Promise<void> {
    await this.dataSource.transaction(async (manager) => {
      const inv    = await this.inventoryRepo.removeStockAsync(input.inventoryId, input.quantity, manager);
      const before = inv.quantityOnHand + input.quantity;
      await this.movementRepo.createWithManagerAsync(this.buildMovementInput(input, EMovementType.StockOut, before, inv.quantityOnHand, false), manager);
      await this.activityLogger.log(this.buildLogEntry(input, EProductLogAction.StockRemoved, input.quantity));
      this.checkLowStock(inv.id, inv.quantityOnHand, inv.reorderLevel);
    });
  }

  public async adjustStock(input: IAdjustStockOperation): Promise<void> {
    await this.dataSource.transaction(async (manager) => {
      const inv    = await this.inventoryRepo.adjustStockAsync(input.inventoryId, input.absoluteQuantity, input.unitCost, manager);
      const op: IStockOperation = { ...input, quantity: input.absoluteQuantity };
      await this.movementRepo.createWithManagerAsync(this.buildMovementInput(op, EMovementType.Adjustment, 0, inv.quantityOnHand, false), manager);
      await this.activityLogger.log(this.buildLogEntry(op, EProductLogAction.StockAdjusted, inv.quantityOnHand));
    });
  }

  public async reserveStock(input: IStockOperation): Promise<void> {
    await this.dataSource.transaction(async (manager) => {
      const inv    = await this.inventoryRepo.reserveStockAsync(input.inventoryId, input.quantity, manager);
      const before = inv.quantityReserved - input.quantity;
      await this.movementRepo.createWithManagerAsync(this.buildMovementInput(input, EMovementType.Reserved, before, inv.quantityReserved, false), manager);
      await this.activityLogger.log(this.buildLogEntry(input, EProductLogAction.StockReserved, input.quantity));
    });
  }

  public async releaseReservation(input: IStockOperation): Promise<void> {
    await this.dataSource.transaction(async (manager) => {
      const inv    = await this.inventoryRepo.releaseReservationAsync(input.inventoryId, input.quantity, manager);
      const before = inv.quantityReserved + input.quantity;
      await this.movementRepo.createWithManagerAsync(this.buildMovementInput(input, EMovementType.ReservationReleased, before, inv.quantityReserved, false), manager);
      await this.activityLogger.log(this.buildLogEntry(input, EProductLogAction.StockReservationReleased, input.quantity));
    });
  }

  public async addUnpublishedStock(input: IStockOperation): Promise<void> {
    await this.dataSource.transaction(async (manager) => {
      const inv    = await this.inventoryRepo.addUnpublishedStockAsync(input.inventoryId, input.quantity, input.unitCost, manager);
      const before = inv.quantityUnpublished - input.quantity;
      await this.movementRepo.createWithManagerAsync(this.buildMovementInput(input, EMovementType.StockIn, before, inv.quantityUnpublished, true), manager);
      await this.activityLogger.log(this.buildLogEntry(input, EProductLogAction.StockAdded, input.quantity, { isUnpublished: true }));
    });
  }

  public async publishStock(input: IPublishStockOperation): Promise<void> {
    await this.dataSource.transaction(async (manager) => {
      const inv    = await this.inventoryRepo.publishStockAsync(input.inventoryId, input.quantity, manager);
      const before = inv.quantityOnHand - input.quantity;
      const op: IStockOperation = { ...input, quantity: input.quantity };
      await this.movementRepo.createWithManagerAsync(this.buildMovementInput(op, EMovementType.Published, before, inv.quantityOnHand, false), manager);
      await this.activityLogger.log(this.buildLogEntry(op, EProductLogAction.StockPublished, input.quantity));
    });
  }

  public async damageStock(input: IStockOperation): Promise<void> {
    await this.dataSource.transaction(async (manager) => {
      const inv    = await this.inventoryRepo.deductStockAsync(input.inventoryId, input.quantity, manager);
      const before = inv.quantityOnHand + input.quantity;
      await this.movementRepo.createWithManagerAsync(this.buildMovementInput(input, EMovementType.Damage, before, inv.quantityOnHand, false), manager);
      await this.activityLogger.log(this.buildLogEntry(input, EProductLogAction.StockDamaged, input.quantity));
    });
  }

  public async writeOffStock(input: IStockOperation): Promise<void> {
    await this.dataSource.transaction(async (manager) => {
      const inv    = await this.inventoryRepo.deductStockAsync(input.inventoryId, input.quantity, manager);
      const before = inv.quantityOnHand + input.quantity;
      await this.movementRepo.createWithManagerAsync(this.buildMovementInput(input, EMovementType.WriteOff, before, inv.quantityOnHand, false), manager);
      await this.activityLogger.log(this.buildLogEntry(input, EProductLogAction.StockWrittenOff, input.quantity));
    });
  }

  public async transferStock(input: ITransferStockOperation): Promise<void> {
    await this.dataSource.transaction(async (manager) => {
      const src  = await this.inventoryRepo.deductStockAsync(input.fromInventoryId, input.quantity, manager);
      const dest = await this.inventoryRepo.addStockAsync(input.toInventoryId, input.quantity, undefined, manager);

      const srcOp: IStockOperation  = { inventoryId: input.fromInventoryId, organizationId: input.organizationId, productId: input.productId, locationId: input.fromLocationId, quantity: input.quantity, performedById: input.performedById, referenceId: input.referenceId, notes: input.notes };
      const destOp: IStockOperation = { inventoryId: input.toInventoryId,   organizationId: input.organizationId, productId: input.productId, locationId: input.toLocationId,   quantity: input.quantity, performedById: input.performedById, referenceId: input.referenceId, notes: input.notes };

      await this.movementRepo.createWithManagerAsync(this.buildMovementInput(srcOp,  EMovementType.TransferOut, src.quantityOnHand  + input.quantity, src.quantityOnHand,  false), manager);
      await this.movementRepo.createWithManagerAsync(this.buildMovementInput(destOp, EMovementType.TransferIn,  dest.quantityOnHand - input.quantity, dest.quantityOnHand, false), manager);
      await this.activityLogger.log(this.buildLogEntry(srcOp,  EProductLogAction.StockTransferredOut, input.quantity));
      await this.activityLogger.log(this.buildLogEntry(destOp, EProductLogAction.StockTransferredIn,  input.quantity));
    });
  }

  // ─── Builders ───────────────────────────────────────────────────────────────

  private buildMovementInput(
    op: IStockOperation,
    movementType: EMovementType,
    quantityBefore: number,
    quantityAfter: number,
    isUnpublishedEntry: boolean,
  ): StockMovementInput {
    return Object.assign(new StockMovementInput(), {
      inventoryId: op.inventoryId, locationId: op.locationId, productId: op.productId,
      performedById: op.performedById, referenceId: op.referenceId, referenceType: op.referenceType,
      movementType, quantity: op.quantity, quantityBefore, quantityAfter,
      unitCost: op.unitCost, isUnpublishedEntry, notes: op.notes,
    });
  }

  private buildLogEntry(op: IStockOperation, action: EProductLogAction, quantity: number, extra?: Record<string, unknown>): ProductLogEntry {
    return Object.assign(new ProductLogEntry(), {
      action, organizationId: op.organizationId, productId: op.productId,
      inventoryId: op.inventoryId, locationId: op.locationId, performedById: op.performedById,
      metadata: { quantity, referenceId: op.referenceId, ...extra },
    });
  }

  private checkLowStock(inventoryId: string, qty: number, reorderLevel: number): void {
    if (qty <= reorderLevel) {
      this.logger.warn({ inventoryId, qty, reorderLevel }, 'low-stock.triggered');
    }
  }
}
