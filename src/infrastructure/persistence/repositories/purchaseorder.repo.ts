import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { Repository } from 'typeorm';
import { randomUUID } from 'crypto';
import { BaseRepo } from '../../../common';
import { Filter, PageableFilter } from '../../../common';
import {
  EMovementType,
  BranchEntity,
  InventoryEntity,
  LocationEntity,
  PurchaseItemAllocationEntity,
  PurchaseItemEntity,
  PurchaseOrderEntity,
  PurchaseOrderPaymentEntity,
  ProductEntity,
  PurchaseReturnEntity,
  PurchaseReturnItemEntity,
  EPurchaseReturnStatus,
  StockMovementEntity,
  SupplierEntity,
} from '../entities';
import { PurchaseOrderFilter, PurchaseOrder } from '../../../application/modules/purchase-orders/domain';
import {
  IPurchaseOrderRepo,
  CreatePurchaseOrderInput,
  PurchaseAllocationInput,
  PurchaseOrderPaymentInput,
  PurchaseReceiptInput,
} from 'src/application/modules/purchase-orders';
import { EPurchaseOrderStatus } from '../../../application/shared/enums';
import { OFFICIAL_ACCOUNT_CODES } from '../../../application/modules/accounting';
import { postOfficialJournal } from './ledger-posting';

@Injectable()
export class PurchaseOrderRepo extends BaseRepo<PurchaseOrderEntity, PurchaseOrder, string, PageableFilter<PurchaseOrderFilter>, Filter<PurchaseOrderFilter>> implements IPurchaseOrderRepo {
  constructor(
    @InjectRepository(PurchaseOrderEntity) internalRepo: Repository<PurchaseOrderEntity>,
    @InjectMapper() mapper: Mapper,
    @InjectPinoLogger(PurchaseOrderRepo.name) logger: PinoLogger,
  ) {
    super(internalRepo, mapper, logger, PurchaseOrderEntity, PurchaseOrder);
  }

  public override get idColumnName(): keyof PurchaseOrderEntity {
    return 'id';
  }

  public async createWithItemsAsync(input: CreatePurchaseOrderInput): Promise<PurchaseOrder> {
    if (!input.items.length) throw new BadRequestException('At least one purchase item is required');
    const duplicateProductIds = input.items.map((item) => item.productId)
      .filter((id, index, ids) => ids.indexOf(id) !== index);
    if (duplicateProductIds.length) throw new BadRequestException('A product may appear only once per purchase order');

    const id = await this.internalRepo.manager.transaction(async (manager) => {
      const supplier = await manager.findOne(SupplierEntity, {
        where: { id: input.supplierId, organizationId: input.organizationId },
      });
      if (!supplier) throw new BadRequestException('Supplier must belong to the current organization');
      if (input.branchId) {
        const branch = await manager.findOne(BranchEntity, { where: { id: input.branchId, organizationId: input.organizationId } });
        if (!branch) throw new BadRequestException('Branch must belong to the current organization');
      }
      const productIds = input.items.map((item) => item.productId);
      const productCount = await manager.createQueryBuilder(ProductEntity, 'product')
        .where('product.organizationId = :organizationId', { organizationId: input.organizationId })
        .andWhere('product.id IN (:...productIds)', { productIds })
        .getCount();
      if (productCount !== productIds.length) throw new BadRequestException('Every product must belong to the current organization');

      let totalAmount = 0;
      for (const item of input.items) {
        if (!Number.isFinite(item.quantityOrdered) || item.quantityOrdered <= 0 ||
            !Number.isFinite(item.unitCost) || item.unitCost < 0) {
          throw new BadRequestException('Purchase quantities and costs are invalid');
        }
        totalAmount += item.quantityOrdered * item.unitCost;
      }
      const po = await manager.save(PurchaseOrderEntity, manager.create(PurchaseOrderEntity, {
        organizationId: input.organizationId, branchId: input.branchId, supplierId: input.supplierId,
        createdById: input.createdById, expectedAt: input.expectedAt ? new Date(input.expectedAt) : undefined,
        notes: input.notes, poNumber: `PO-${new Date().getUTCFullYear()}-${randomUUID().slice(0, 8).toUpperCase()}`,
        status: EPurchaseOrderStatus.Draft, totalAmount: Number(totalAmount.toFixed(4)), amountPaid: 0,
      }));
      await manager.save(PurchaseItemEntity, input.items.map((item) => manager.create(PurchaseItemEntity, {
        purchaseOrderId: po.id, productId: item.productId, quantityOrdered: item.quantityOrdered,
        quantityReceived: 0, quantityAllocated: 0, unitCost: item.unitCost,
        totalCost: Number((item.quantityOrdered * item.unitCost).toFixed(4)),
      })));
      return po.id;
    });
    return this.getAsync(id);
  }

  public async updateDraftAsync(
    id: string,
    patch: { expectedAt?: string; notes?: string; status?: EPurchaseOrderStatus },
  ): Promise<PurchaseOrder> {
    await this.internalRepo.manager.transaction(async (manager) => {
      const po = await manager.findOne(PurchaseOrderEntity, { where: { id }, lock: { mode: 'pessimistic_write' } });
      if (!po) throw new NotFoundException(`Purchase order ${id} not found`);
      if (po.status !== EPurchaseOrderStatus.Draft) throw new BadRequestException('Only draft purchase orders can be updated or cancelled');
      if (patch.status && ![EPurchaseOrderStatus.Ordered, EPurchaseOrderStatus.Cancelled].includes(patch.status)) {
        throw new BadRequestException('A draft purchase order may only be ordered or cancelled');
      }
      if (patch.expectedAt !== undefined) po.expectedAt = new Date(patch.expectedAt);
      if (patch.notes !== undefined) po.notes = patch.notes;
      if (patch.status !== undefined) po.status = patch.status;
      await manager.save(po);
    });
    return this.getAsync(id);
  }

  public async deleteDraftAsync(id: string): Promise<void> {
    await this.internalRepo.manager.transaction(async (manager) => {
      const po = await manager.findOne(PurchaseOrderEntity, { where: { id }, lock: { mode: 'pessimistic_write' } });
      if (!po) throw new NotFoundException(`Purchase order ${id} not found`);
      if (po.status !== EPurchaseOrderStatus.Draft || Number(po.amountPaid ?? 0) !== 0) {
        throw new BadRequestException('Only unpaid draft purchase orders can be deleted');
      }
      await manager.delete(PurchaseOrderEntity, { id });
    });
  }

  public async recordPaymentAsync(input: PurchaseOrderPaymentInput): Promise<PurchaseOrder> {
    if (!Number.isFinite(input.amount) || input.amount <= 0) {
      throw new BadRequestException('Payment amount must be greater than 0');
    }

    return this.internalRepo.manager.transaction(async (manager) => {
      const po = await manager.findOne(PurchaseOrderEntity, {
        where: { id: input.purchaseOrderId, organizationId: input.organizationId },
        lock: { mode: 'pessimistic_write' },
      });
      if (!po) throw new NotFoundException(`Purchase order ${input.purchaseOrderId} not found`);
      if ([EPurchaseOrderStatus.Draft, EPurchaseOrderStatus.Cancelled].includes(po.status)) {
        throw new BadRequestException(`Cannot record payment for a purchase order with status "${po.status}"`);
      }

      const finalizedReturns = await manager
        .getRepository(PurchaseReturnItemEntity)
        .createQueryBuilder('item')
        .innerJoin(PurchaseReturnEntity, 'return', 'return.id = item.purchaseReturnId')
        .select('COALESCE(SUM(item.lineTotal), 0)', 'value')
        .where('return.purchaseOrderId = :purchaseOrderId', { purchaseOrderId: po.id })
        .andWhere('return.status = :status', { status: EPurchaseReturnStatus.Finalized })
        .getRawOne<{ value: string }>();
      const remaining = Math.max(
        Number(po.totalAmount) - Number(finalizedReturns?.value ?? 0) - Number(po.amountPaid ?? 0),
        0,
      );
      if (input.amount > remaining) {
        throw new BadRequestException(
          `Payment amount ${input.amount} exceeds outstanding balance ${remaining}`,
        );
      }

      const payment = await manager.save(
        PurchaseOrderPaymentEntity,
        manager.create(PurchaseOrderPaymentEntity, {
          organizationId: input.organizationId,
          purchaseOrderId: input.purchaseOrderId,
          supplierId: po.supplierId,
          amount: input.amount,
          paymentMethod: input.paymentMethod,
          paidAt: input.paidAt,
          note: input.note,
          performedById: input.performedById,
        }),
      );
      const cashAccount = input.paymentMethod.toLowerCase() === 'cash'
        ? OFFICIAL_ACCOUNT_CODES.Cash
        : OFFICIAL_ACCOUNT_CODES.Bank;
      const recognizedValue = await this.getAllocatedValue(manager, po.id);
      const payableOutstanding = Math.max(recognizedValue - Number(po.amountPaid ?? 0), 0);
      const payablePart = Number(Math.min(input.amount, payableOutstanding).toFixed(4));
      const advancePart = Number((input.amount - payablePart).toFixed(4));
      await postOfficialJournal(manager, {
        organizationId: input.organizationId,
        idempotencyKey: `purchase-payment:${payment.id}`,
        sourceType: 'purchase_order_payment',
        sourceId: payment.id,
        occurredAt: input.paidAt,
        description: `Supplier payment for ${po.poNumber}`,
        createdBy: input.performedById,
        lines: [
          ...(payablePart > 0 ? [{
            accountCode: OFFICIAL_ACCOUNT_CODES.AccountsPayable,
            debit: payablePart,
            credit: 0,
            supplierId: po.supplierId,
            branchId: po.branchId,
          }] : []),
          ...(advancePart > 0 ? [{
            accountCode: OFFICIAL_ACCOUNT_CODES.SupplierAdvances,
            debit: advancePart,
            credit: 0,
            supplierId: po.supplierId,
            branchId: po.branchId,
          }] : []),
          {
            accountCode: cashAccount,
            debit: 0,
            credit: input.amount,
            supplierId: po.supplierId,
            branchId: po.branchId,
          },
        ],
      });
      po.amountPaid = Number(po.amountPaid ?? 0) + input.amount;
      const saved = await manager.save(PurchaseOrderEntity, po);
      return this.mapper.map(saved, PurchaseOrderEntity, PurchaseOrder);
    });
  }

  public async receiveAsync(input: PurchaseReceiptInput): Promise<PurchaseOrder> {
    if (!input.items.length) throw new BadRequestException('At least one received item is required');
    const duplicateIds = input.items
      .map((item) => item.purchaseItemId)
      .filter((id, index, ids) => ids.indexOf(id) !== index);
    if (duplicateIds.length) throw new BadRequestException('A purchase item may appear only once per receipt');

    return this.internalRepo.manager.transaction(async (manager) => {
      const po = await manager.findOne(PurchaseOrderEntity, {
        where: { id: input.purchaseOrderId, organizationId: input.organizationId },
        lock: { mode: 'pessimistic_write' },
      });
      if (!po) throw new NotFoundException(`Purchase order ${input.purchaseOrderId} not found`);
      if ([EPurchaseOrderStatus.Allocated, EPurchaseOrderStatus.Cancelled].includes(po.status)) {
        throw new BadRequestException(`Cannot receive items for a purchase order with status "${po.status}"`);
      }

      for (const receipt of [...input.items].sort((a, b) => a.purchaseItemId.localeCompare(b.purchaseItemId))) {
        const quantity = Number(receipt.quantityReceived);
        if (!Number.isFinite(quantity) || quantity <= 0) {
          throw new BadRequestException('Received quantity must be greater than 0');
        }
        const item = await manager.findOne(PurchaseItemEntity, {
          where: { id: receipt.purchaseItemId, purchaseOrderId: po.id },
          lock: { mode: 'pessimistic_write' },
        });
        if (!item) throw new NotFoundException(`Purchase item ${receipt.purchaseItemId} not found`);
        const totalReceived = Number(item.quantityReceived ?? 0) + quantity;
        if (totalReceived > Number(item.quantityOrdered)) {
          throw new BadRequestException(
            `Receipt exceeds ordered quantity for item ${item.id}. Remaining: ${Number(item.quantityOrdered) - Number(item.quantityReceived ?? 0)}`,
          );
        }
        item.quantityReceived = totalReceived;
        await manager.save(item);
      }

      const items = await manager.find(PurchaseItemEntity, { where: { purchaseOrderId: po.id } });
      const allDone = items.length > 0 && items.every(
        (item) => Number(item.quantityReceived ?? 0) === Number(item.quantityOrdered),
      );
      const anyDone = items.some((item) => Number(item.quantityReceived ?? 0) > 0);
      po.status = allDone
        ? EPurchaseOrderStatus.Received
        : anyDone
          ? EPurchaseOrderStatus.PartiallyReceived
          : po.status;
      po.receivedAt = allDone ? new Date() : undefined;
      return this.mapper.map(await manager.save(po), PurchaseOrderEntity, PurchaseOrder);
    });
  }

  public async allocateAsync(input: PurchaseAllocationInput): Promise<PurchaseOrder> {
    if (!input.allocations.length) throw new BadRequestException('At least one allocation is required');

    return this.internalRepo.manager.transaction(async (manager) => {
      const po = await manager.findOne(PurchaseOrderEntity, {
        where: { id: input.purchaseOrderId, organizationId: input.organizationId },
        lock: { mode: 'pessimistic_write' },
      });
      if (!po) throw new NotFoundException(`Purchase order ${input.purchaseOrderId} not found`);
      const allowed = [
        EPurchaseOrderStatus.PartiallyReceived,
        EPurchaseOrderStatus.Received,
        EPurchaseOrderStatus.PartiallyAllocated,
      ];
      if (!allowed.includes(po.status)) {
        throw new BadRequestException(`Cannot allocate stock for a purchase order with status "${po.status}"`);
      }

      for (const allocation of input.allocations) {
        const quantity = Number(allocation.quantity);
        if (!Number.isFinite(quantity) || quantity <= 0) {
          throw new BadRequestException('Allocation quantity must be greater than 0');
        }
        const item = await manager.findOne(PurchaseItemEntity, {
          where: { id: allocation.purchaseItemId, purchaseOrderId: po.id },
          lock: { mode: 'pessimistic_write' },
        });
        if (!item) throw new NotFoundException(`Purchase item ${allocation.purchaseItemId} not found`);
        const location = await manager.findOne(LocationEntity, {
          where: { id: allocation.locationId, organizationId: input.organizationId },
        });
        if (!location) throw new BadRequestException('Allocation location must belong to the current organization');
        if (po.branchId && location.branchId !== po.branchId) {
          throw new BadRequestException('Allocation location must belong to the purchase order branch');
        }
        const available = Number(item.quantityReceived ?? 0) - Number(item.quantityAllocated ?? 0);
        if (quantity > available) {
          throw new BadRequestException(`Allocation exceeds received quantity. Available: ${available}`);
        }

        await manager.query('SELECT pg_advisory_xact_lock(hashtext($1))', [
          `inventory:${input.organizationId}:${allocation.locationId}:${item.productId}`,
        ]);
        let inventory = await manager.findOne(InventoryEntity, {
          where: {
            organizationId: input.organizationId,
            locationId: allocation.locationId,
            productId: item.productId,
          },
          lock: { mode: 'pessimistic_write' },
        });
        if (!inventory) {
          inventory = await manager.save(
            InventoryEntity,
            manager.create(InventoryEntity, {
              organizationId: input.organizationId,
              locationId: allocation.locationId,
              productId: item.productId,
              quantityOnHand: 0,
              quantityReserved: 0,
              reorderLevel: 0,
            }),
          );
        }
        const before = Number(inventory.quantityOnHand);
        const totalQuantity = before + quantity;
        inventory.averageCost = totalQuantity > 0
          ? (before * Number(inventory.averageCost ?? 0) + quantity * Number(item.unitCost)) / totalQuantity
          : Number(item.unitCost);
        inventory.quantityOnHand = totalQuantity;
        await manager.save(inventory);
        await manager.save(
          StockMovementEntity,
          manager.create(StockMovementEntity, {
            inventoryId: inventory.id,
            locationId: allocation.locationId,
            productId: item.productId,
            performedById: input.performedById,
            referenceId: po.id,
            referenceType: 'purchase_order',
            movementType: EMovementType.StockIn,
            quantity,
            quantityBefore: before,
            quantityAfter: totalQuantity,
            unitCost: Number(item.unitCost),
            notes: input.notes,
          }),
        );
        const allocationRecord = await manager.save(
          PurchaseItemAllocationEntity,
          manager.create(PurchaseItemAllocationEntity, {
            organizationId: input.organizationId,
            purchaseOrderId: po.id,
            purchaseItemId: item.id,
            locationId: allocation.locationId,
            quantity,
            performedById: input.performedById,
            notes: input.notes,
          }),
        );
        const allocationValue = Number((quantity * Number(item.unitCost)).toFixed(4));
        const recognizedBefore = await this.getAllocatedValue(manager, po.id);
        const availableAdvance = Math.max(Number(po.amountPaid ?? 0) - recognizedBefore, 0);
        const advanceApplied = Number(Math.min(availableAdvance, allocationValue).toFixed(4));
        const payableCreated = Number((allocationValue - advanceApplied).toFixed(4));
        await postOfficialJournal(manager, {
          organizationId: input.organizationId,
          idempotencyKey: `purchase-allocation:${allocationRecord.id}`,
          sourceType: 'purchase_item_allocation',
          sourceId: allocationRecord.id,
          occurredAt: new Date(),
          description: `Inventory allocation for ${po.poNumber}`,
          createdBy: input.performedById,
          lines: [
            {
              accountCode: OFFICIAL_ACCOUNT_CODES.Inventory,
              debit: allocationValue,
              credit: 0,
              supplierId: po.supplierId,
              branchId: po.branchId,
              locationId: allocation.locationId,
            },
            ...(advanceApplied > 0 ? [{
              accountCode: OFFICIAL_ACCOUNT_CODES.SupplierAdvances,
              debit: 0,
              credit: advanceApplied,
              supplierId: po.supplierId,
              branchId: po.branchId,
              locationId: allocation.locationId,
            }] : []),
            ...(payableCreated > 0 ? [{
              accountCode: OFFICIAL_ACCOUNT_CODES.AccountsPayable,
              debit: 0,
              credit: payableCreated,
              supplierId: po.supplierId,
              branchId: po.branchId,
              locationId: allocation.locationId,
            }] : []),
          ],
        });
        item.quantityAllocated = Number(item.quantityAllocated ?? 0) + quantity;
        await manager.save(item);
      }

      const items = await manager.find(PurchaseItemEntity, { where: { purchaseOrderId: po.id } });
      const anyAllocated = items.some((item) => Number(item.quantityAllocated ?? 0) > 0);
      const fullyAllocated = items.length > 0 && items.every(
        (item) =>
          Number(item.quantityReceived ?? 0) > 0 &&
          Number(item.quantityAllocated ?? 0) === Number(item.quantityReceived ?? 0),
      );
      po.status = fullyAllocated
        ? EPurchaseOrderStatus.Allocated
        : anyAllocated
          ? EPurchaseOrderStatus.PartiallyAllocated
          : po.status;
      return this.mapper.map(await manager.save(po), PurchaseOrderEntity, PurchaseOrder);
    });
  }

  private async getAllocatedValue(manager: import('typeorm').EntityManager, purchaseOrderId: string): Promise<number> {
    const row = await manager
      .getRepository(PurchaseItemEntity)
      .createQueryBuilder('item')
      .select('COALESCE(SUM(item.quantityAllocated * item.unitCost), 0)', 'value')
      .where('item.purchaseOrderId = :purchaseOrderId', { purchaseOrderId })
      .getRawOne<{ value: string }>();
    return Number(row?.value ?? 0);
  }
}
