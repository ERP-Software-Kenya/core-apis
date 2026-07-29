import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { DataSource } from 'typeorm';
import { InjectDataSource } from '@nestjs/typeorm';
import { EMovementType, EUnpublishedMovementType, UnpublishedStockEntity } from 'src/infrastructure/persistence/entities';
import { EProductLogAction } from '../enums/e-product-log-action.enum';
import {
  IStockOperation,
  IAdjustStockOperation,
  IPublishStockOperation,
  IAddUnpublishedStockOperation,
  ITransferStockOperation,
  StockMovementInput,
  UnpublishedStockMovementInput,
} from '../interfaces/i-stock-operation.interface';
import { INVENTORY_REPO, STOCK_MOVEMENT_REPO, UNPUBLISHED_STOCK_REPO, UNPUBLISHED_STOCK_MOVEMENT_REPO } from '../../constants';
import { IInventoryRepo } from 'src/application/modules/inventory';
import { IStockMovementRepo } from 'src/application/modules/stock-movements';
import { IUnpublishedStockRepo } from 'src/application/modules/unpublished-stock/i-unpublished-stock.repo';
import { IUnpublishedStockMovementRepo } from 'src/application/modules/unpublished-stock/i-unpublished-stock-movement.repo';
import { ProductActivityLogger, ProductLogEntry } from './product-activity-logger.service';

@Injectable()
export class StockOrchestrationService {
  constructor(
    @Inject(INVENTORY_REPO) private readonly inventoryRepo: IInventoryRepo,
    @Inject(STOCK_MOVEMENT_REPO) private readonly movementRepo: IStockMovementRepo,
    @Inject(UNPUBLISHED_STOCK_REPO) private readonly unpublishedStockRepo: IUnpublishedStockRepo,
    @Inject(UNPUBLISHED_STOCK_MOVEMENT_REPO) private readonly unpublishedMovementRepo: IUnpublishedStockMovementRepo,
    private readonly activityLogger: ProductActivityLogger,
    @InjectDataSource() private readonly dataSource: DataSource,
    @InjectPinoLogger(StockOrchestrationService.name) private readonly logger: PinoLogger,
  ) {}

  public async addStock(input: IStockOperation): Promise<void> {
    await this.dataSource.transaction(async (manager) => {
      const inv    = await this.inventoryRepo.addStockAsync(input.inventoryId, input.quantity, input.unitCost, manager);
      const before = inv.quantityOnHand - input.quantity;
      await this.movementRepo.createWithManagerAsync(this.buildMovementInput(input, EMovementType.StockIn, before, inv.quantityOnHand), manager);
      await this.activityLogger.log(this.buildLogEntry(input, EProductLogAction.StockAdded, input.quantity));
      this.checkLowStock(inv.id, inv.quantityOnHand, inv.reorderLevel);
    });
  }

  public async removeStock(input: IStockOperation): Promise<void> {
    await this.dataSource.transaction(async (manager) => {
      const inv    = await this.inventoryRepo.removeStockAsync(input.inventoryId, input.quantity, manager);
      const before = inv.quantityOnHand + input.quantity;
      await this.movementRepo.createWithManagerAsync(this.buildMovementInput(input, EMovementType.StockOut, before, inv.quantityOnHand), manager);
      await this.activityLogger.log(this.buildLogEntry(input, EProductLogAction.StockRemoved, input.quantity));
      this.checkLowStock(inv.id, inv.quantityOnHand, inv.reorderLevel);
    });
  }

  public async adjustStock(input: IAdjustStockOperation): Promise<void> {
    await this.dataSource.transaction(async (manager) => {
      const inv = await this.inventoryRepo.adjustStockAsync(input.inventoryId, input.absoluteQuantity, input.unitCost, manager);
      const op: IStockOperation = { ...input, quantity: input.absoluteQuantity };
      await this.movementRepo.createWithManagerAsync(this.buildMovementInput(op, EMovementType.Adjustment, 0, inv.quantityOnHand), manager);
      await this.activityLogger.log(this.buildLogEntry(op, EProductLogAction.StockAdjusted, inv.quantityOnHand));
    });
  }

  public async reserveStock(input: IStockOperation): Promise<void> {
    await this.dataSource.transaction(async (manager) => {
      const inv    = await this.inventoryRepo.reserveStockAsync(input.inventoryId, input.quantity, manager);
      const before = inv.quantityReserved - input.quantity;
      await this.movementRepo.createWithManagerAsync(this.buildMovementInput(input, EMovementType.Reserved, before, inv.quantityReserved), manager);
      await this.activityLogger.log(this.buildLogEntry(input, EProductLogAction.StockReserved, input.quantity));
    });
  }

  public async releaseReservation(input: IStockOperation): Promise<void> {
    await this.dataSource.transaction(async (manager) => {
      const inv    = await this.inventoryRepo.releaseReservationAsync(input.inventoryId, input.quantity, manager);
      const before = inv.quantityReserved + input.quantity;
      await this.movementRepo.createWithManagerAsync(this.buildMovementInput(input, EMovementType.ReservationReleased, before, inv.quantityReserved), manager);
      await this.activityLogger.log(this.buildLogEntry(input, EProductLogAction.StockReservationReleased, input.quantity));
    });
  }

  public async addUnpublishedStock(input: IAddUnpublishedStockOperation): Promise<void> {
    await this.dataSource.transaction(async (manager) => {
      const rec     = await this.unpublishedStockRepo.findOrCreateAsync(input.organizationId, input.locationId, input.productId, manager);
      const before  = Number(rec.quantityOnHand);
      const updated = await this.unpublishedStockRepo.addStockAsync(rec.id, input.quantity, input.unitCost, manager);
      await this.unpublishedMovementRepo.createWithManagerAsync(
        this.buildUnpublishedMovementInput(rec.id, input, EUnpublishedMovementType.StockIn, before, updated.quantityOnHand),
        manager,
      );
      await this.activityLogger.log(this.buildLogEntry(
        { inventoryId: rec.id, organizationId: input.organizationId, productId: input.productId, locationId: input.locationId, quantity: input.quantity, performedById: input.performedById, notes: input.notes },
        EProductLogAction.StockAdded,
        input.quantity,
        { isUnpublished: true },
      ));
    });
  }

  public async publishStock(input: IPublishStockOperation): Promise<void> {
    await this.dataSource.transaction(async (manager) => {
      const unpublished = await manager.findOneOrFail(UnpublishedStockEntity, { where: { id: input.unpublishedStockId } });
      if (input.quantity > Number(unpublished.quantityOnHand)) {
        throw new BadRequestException(`Cannot publish more than available unpublished stock: ${unpublished.quantityOnHand}`);
      }
      const { organizationId, locationId, productId } = unpublished;
      const inv = await this.inventoryRepo.findByOrgLocationProductAsync(organizationId, locationId, productId, manager);
      if (!inv) throw new BadRequestException('No published inventory record found for this product/location. Create one first.');
      const unpBefore = Number(unpublished.quantityOnHand);
      const invBefore = Number(inv.quantityOnHand);
      const updatedUnp = await this.unpublishedStockRepo.deductStockAsync(input.unpublishedStockId, input.quantity, manager);
      const updatedInv = await this.inventoryRepo.addStockAsync(inv.id, input.quantity, undefined, manager);
      await this.unpublishedMovementRepo.createWithManagerAsync(
        this.buildUnpublishedMovementInput(input.unpublishedStockId, { organizationId, locationId, productId, quantity: input.quantity, performedById: input.performedById, notes: input.notes }, EUnpublishedMovementType.TransferOut, unpBefore, updatedUnp.quantityOnHand),
        manager,
      );
      const publishedOp: IStockOperation = { inventoryId: inv.id, organizationId, locationId, productId, quantity: input.quantity, performedById: input.performedById, notes: input.notes };
      await this.movementRepo.createWithManagerAsync(
        this.buildMovementInput(publishedOp, EMovementType.StockIn, invBefore, updatedInv.quantityOnHand),
        manager,
      );
      await this.activityLogger.log(this.buildLogEntry(publishedOp, EProductLogAction.StockPublished, input.quantity));
    });
  }

  public async damageStock(input: IStockOperation): Promise<void> {
    await this.dataSource.transaction(async (manager) => {
      const inv    = await this.inventoryRepo.deductStockAsync(input.inventoryId, input.quantity, manager);
      const before = inv.quantityOnHand + input.quantity;
      await this.movementRepo.createWithManagerAsync(this.buildMovementInput(input, EMovementType.Damage, before, inv.quantityOnHand), manager);
      await this.activityLogger.log(this.buildLogEntry(input, EProductLogAction.StockDamaged, input.quantity));
    });
  }

  public async writeOffStock(input: IStockOperation): Promise<void> {
    await this.dataSource.transaction(async (manager) => {
      const inv    = await this.inventoryRepo.deductStockAsync(input.inventoryId, input.quantity, manager);
      const before = inv.quantityOnHand + input.quantity;
      await this.movementRepo.createWithManagerAsync(this.buildMovementInput(input, EMovementType.WriteOff, before, inv.quantityOnHand), manager);
      await this.activityLogger.log(this.buildLogEntry(input, EProductLogAction.StockWrittenOff, input.quantity));
    });
  }

  public async transferStock(input: ITransferStockOperation): Promise<void> {
    await this.dataSource.transaction(async (manager) => {
      const src  = await this.inventoryRepo.deductStockAsync(input.fromInventoryId, input.quantity, manager);
      const dest = await this.inventoryRepo.addStockAsync(input.toInventoryId, input.quantity, undefined, manager);

      const srcOp: IStockOperation  = { inventoryId: input.fromInventoryId, organizationId: input.organizationId, productId: input.productId, locationId: input.fromLocationId, quantity: input.quantity, performedById: input.performedById, referenceId: input.referenceId, notes: input.notes };
      const destOp: IStockOperation = { inventoryId: input.toInventoryId, organizationId: input.organizationId, productId: input.productId, locationId: input.toLocationId, quantity: input.quantity, performedById: input.performedById, referenceId: input.referenceId, notes: input.notes };

      await this.movementRepo.createWithManagerAsync(this.buildMovementInput(srcOp, EMovementType.TransferOut, src.quantityOnHand + input.quantity, src.quantityOnHand), manager);
      await this.movementRepo.createWithManagerAsync(this.buildMovementInput(destOp, EMovementType.TransferIn, dest.quantityOnHand - input.quantity, dest.quantityOnHand), manager);
      await this.activityLogger.log(this.buildLogEntry(srcOp, EProductLogAction.StockTransferredOut, input.quantity));
      await this.activityLogger.log(this.buildLogEntry(destOp, EProductLogAction.StockTransferredIn, input.quantity));
    });
  }

  private buildMovementInput(op: IStockOperation, movementType: EMovementType, quantityBefore: number, quantityAfter: number): StockMovementInput {
    return Object.assign(new StockMovementInput(), {
      inventoryId: op.inventoryId, locationId: op.locationId, productId: op.productId,
      performedById: op.performedById, referenceId: op.referenceId, referenceType: op.referenceType,
      movementType, quantity: op.quantity, quantityBefore, quantityAfter,
      unitCost: op.unitCost, notes: op.notes,
    });
  }

  private buildUnpublishedMovementInput(
    unpublishedStockId: string,
    op: { organizationId: string; locationId: string; productId: string; quantity: number; performedById?: string; unitCost?: number; notes?: string },
    movementType: EUnpublishedMovementType,
    quantityBefore: number,
    quantityAfter: number,
  ): UnpublishedStockMovementInput {
    return Object.assign(new UnpublishedStockMovementInput(), {
      unpublishedStockId, locationId: op.locationId, productId: op.productId,
      performedById: op.performedById, movementType, quantity: op.quantity,
      quantityBefore, quantityAfter, unitCost: op.unitCost, notes: op.notes,
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
