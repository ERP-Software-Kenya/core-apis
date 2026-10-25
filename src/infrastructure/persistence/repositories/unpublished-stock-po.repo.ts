import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { Repository } from 'typeorm';
import { BaseRepo, Filter, PageableFilter } from '../../../common';
import {
  EUnpublishedMovementType,
  LocationEntity,
  ProductEntity,
  SupplierEntity,
  UnpublishedStockEntity,
  UnpublishedStockMovementEntity,
  UnpublishedStockPOPaymentEntity,
  UnpublishedStockPurchaseItemAllocationEntity,
  UnpublishedStockPurchaseItemEntity,
  UnpublishedStockPurchaseOrderEntity,
  UnpublishedStockPurchaseReturnEntity,
  UnpublishedStockPurchaseReturnItemEntity,
  UnpublishedStockPurchaseReturnRefundEntity,
  EUnpublishedStockPurchaseReturnStatus,
} from '../entities';
import { UnpublishedStockPurchaseOrder, UnpublishedStockPOFilter } from '../../../application/modules/unpublished-stock-purchase-orders/domain';
import {
  AllocateBlackPurchaseInput,
  BlackPurchaseReturnResult,
  BlackPurchaseReturnRefundResult,
  CreateBlackPurchaseReturnInput,
  CreateBlackPurchaseInput,
  IUnpublishedStockPORepo,
  PayBlackPurchaseInput,
  ReceiveBlackPurchaseInput,
  RecordBlackPurchaseReturnRefundInput,
} from '../../../application/modules/unpublished-stock-purchase-orders/i-unpublished-stock-po.repo';
import { EPurchaseOrderStatus } from '../../../application/shared/enums';
import {
  BLACK_LEDGER_ACCOUNT_CODES,
  calculatePurchaseAllocationFunding,
  calculatePurchasePaymentFunding,
  calculatePurchaseReturnSettlement,
  calculateSupplierCreditOutstanding,
} from '../../../application/modules/accounting';
import { postBlackJournal } from './ledger-posting';
import { randomUUID } from 'crypto';

@Injectable()
export class UnpublishedStockPORepo
  extends BaseRepo<
    UnpublishedStockPurchaseOrderEntity,
    UnpublishedStockPurchaseOrder,
    string,
    PageableFilter<UnpublishedStockPOFilter>,
    Filter<UnpublishedStockPOFilter>
  >
  implements IUnpublishedStockPORepo
{
  constructor(
    @InjectRepository(UnpublishedStockPurchaseOrderEntity) internalRepo: Repository<UnpublishedStockPurchaseOrderEntity>,
    @InjectMapper() mapper: Mapper,
    @InjectPinoLogger(UnpublishedStockPORepo.name) logger: PinoLogger,
  ) {
    super(internalRepo, mapper, logger, UnpublishedStockPurchaseOrderEntity, UnpublishedStockPurchaseOrder);
  }

  public override get idColumnName(): keyof UnpublishedStockPurchaseOrderEntity {
    return 'id';
  }

  public override async getAsync(id: string): Promise<UnpublishedStockPurchaseOrder> {
    const entity = await this.internalRepo.findOne({ where: { id }, relations: { items: true } });
    return entity ? this.mapToModel(entity) : null;
  }

  public async createWithItemsAsync(input: CreateBlackPurchaseInput): Promise<UnpublishedStockPurchaseOrder> {
    const id = await this.internalRepo.manager.transaction(async (manager) => {
      if (!input.items.length) throw new BadRequestException('At least one purchase item is required');
      const supplier = await manager.findOne(SupplierEntity, {
        where: { id: input.supplierId, organizationId: input.organizationId },
      });
      if (!supplier) throw new BadRequestException('Supplier must belong to the current organization');
      const productIds = [...new Set(input.items.map((item) => item.productId))];
      const products = await manager.createQueryBuilder(ProductEntity, 'product')
        .where('product.organizationId = :organizationId', { organizationId: input.organizationId })
        .andWhere('product.id IN (:...productIds)', { productIds })
        .getCount();
      if (products !== productIds.length) {
        throw new BadRequestException('Every product must belong to the current organization');
      }
      let totalAmount = 0;
      for (const item of input.items) {
        if (!Number.isFinite(item.quantityOrdered) || item.quantityOrdered <= 0 ||
            !Number.isFinite(item.unitCost) || item.unitCost < 0) {
          throw new BadRequestException('Purchase quantities and costs are invalid');
        }
        totalAmount += item.quantityOrdered * item.unitCost;
      }
      const po = await manager.save(UnpublishedStockPurchaseOrderEntity, manager.create(UnpublishedStockPurchaseOrderEntity, {
        organizationId: input.organizationId,
        supplierId: input.supplierId,
        branchId: input.branchId,
        createdById: input.createdById,
        expectedAt: input.expectedAt ? new Date(input.expectedAt) : undefined,
        notes: input.notes,
        poNumber: `BSPO-${new Date().getUTCFullYear()}-${randomUUID().slice(0, 8).toUpperCase()}`,
        status: EPurchaseOrderStatus.Draft,
        totalAmount: Number(totalAmount.toFixed(4)),
        amountPaid: 0,
      }));
      await manager.save(UnpublishedStockPurchaseItemEntity, input.items.map((item) =>
        manager.create(UnpublishedStockPurchaseItemEntity, {
          purchaseOrderId: po.id,
          productId: item.productId,
          quantityOrdered: item.quantityOrdered,
          quantityReceived: 0,
          quantityAllocated: 0,
          unitCost: item.unitCost,
          totalCost: Number((item.quantityOrdered * item.unitCost).toFixed(4)),
        }),
      ));
      return po.id;
    });
    return this.getAsync(id);
  }

  public async receiveAsync(input: ReceiveBlackPurchaseInput): Promise<UnpublishedStockPurchaseOrder> {
    await this.internalRepo.manager.transaction(async (manager) => {
      const po = await manager.findOne(UnpublishedStockPurchaseOrderEntity, {
        where: { id: input.purchaseOrderId, organizationId: input.organizationId },
        lock: { mode: 'pessimistic_write' },
      });
      if (!po) throw new NotFoundException(`Black purchase order ${input.purchaseOrderId} not found`);
      if (![
        EPurchaseOrderStatus.Ordered,
        EPurchaseOrderStatus.PartiallyReceived,
        EPurchaseOrderStatus.PartiallyAllocated,
      ].includes(po.status)) {
        throw new BadRequestException(`Cannot receive items in status "${po.status}"`);
      }
      if (!input.items.length) throw new BadRequestException('At least one receipt item is required');
      for (const receipt of [...input.items].sort((a, b) => a.purchaseItemId.localeCompare(b.purchaseItemId))) {
        const quantity = Number(receipt.quantityReceived);
        if (!Number.isFinite(quantity) || quantity <= 0) throw new BadRequestException('Received quantity must be positive');
        const item = await manager.findOne(UnpublishedStockPurchaseItemEntity, {
          where: { id: receipt.purchaseItemId, purchaseOrderId: po.id },
          lock: { mode: 'pessimistic_write' },
        });
        if (!item) throw new NotFoundException(`Purchase item ${receipt.purchaseItemId} not found`);
        const received = Number(item.quantityReceived ?? 0) + quantity;
        if (received > Number(item.quantityOrdered)) throw new BadRequestException('Receipt exceeds ordered quantity');
        item.quantityReceived = received;
        await manager.save(item);
      }
      const items = await manager.find(UnpublishedStockPurchaseItemEntity, { where: { purchaseOrderId: po.id } });
      const complete = items.length > 0 && items.every((item) => Number(item.quantityReceived) === Number(item.quantityOrdered));
      const anyAllocated = items.some((item) => Number(item.quantityAllocated) > 0);
      const fullyAllocated = complete && items.every((item) => Number(item.quantityAllocated) === Number(item.quantityReceived));
      po.status = fullyAllocated
        ? EPurchaseOrderStatus.Allocated
        : anyAllocated
          ? EPurchaseOrderStatus.PartiallyAllocated
          : complete
            ? EPurchaseOrderStatus.Received
            : EPurchaseOrderStatus.PartiallyReceived;
      po.receivedAt = complete ? new Date() : po.receivedAt;
      await manager.save(po);
    });
    return this.getAsync(input.purchaseOrderId);
  }

  public async allocateAsync(input: AllocateBlackPurchaseInput): Promise<UnpublishedStockPurchaseOrder> {
    await this.internalRepo.manager.transaction(async (manager) => {
      const po = await manager.findOne(UnpublishedStockPurchaseOrderEntity, {
        where: { id: input.purchaseOrderId, organizationId: input.organizationId },
        lock: { mode: 'pessimistic_write' },
      });
      if (!po) throw new NotFoundException(`Black purchase order ${input.purchaseOrderId} not found`);
      if (![EPurchaseOrderStatus.PartiallyReceived, EPurchaseOrderStatus.Received, EPurchaseOrderStatus.PartiallyAllocated].includes(po.status)) {
        throw new BadRequestException(`Cannot allocate stock in status "${po.status}"`);
      }
      if (!input.allocations.length) throw new BadRequestException('At least one allocation is required');
      for (const allocation of [...input.allocations].sort((a, b) =>
        `${a.locationId}:${a.purchaseItemId}`.localeCompare(`${b.locationId}:${b.purchaseItemId}`),
      )) {
        const quantity = Number(allocation.quantity);
        if (!Number.isFinite(quantity) || quantity <= 0) throw new BadRequestException('Allocation quantity must be positive');
        const [item, location] = await Promise.all([
          manager.findOne(UnpublishedStockPurchaseItemEntity, {
            where: { id: allocation.purchaseItemId, purchaseOrderId: po.id },
            lock: { mode: 'pessimistic_write' },
          }),
          manager.findOne(LocationEntity, {
            where: { id: allocation.locationId, organizationId: input.organizationId },
          }),
        ]);
        if (!item) throw new NotFoundException(`Purchase item ${allocation.purchaseItemId} not found`);
        if (!location) throw new BadRequestException('Allocation location must belong to the current organization');
        if (po.branchId && location.branchId !== po.branchId) {
          throw new BadRequestException('Allocation location must belong to the purchase order branch');
        }
        const available = Number(item.quantityReceived ?? 0) - Number(item.quantityAllocated ?? 0);
        if (quantity > available) throw new BadRequestException(`Allocation exceeds received quantity. Available: ${available}`);

        await manager.query('SELECT pg_advisory_xact_lock(hashtext($1))', [
          `black-stock:${input.organizationId}:${allocation.locationId}:${item.productId}`,
        ]);
        let stock = await manager.findOne(UnpublishedStockEntity, {
          where: { organizationId: input.organizationId, locationId: allocation.locationId, productId: item.productId },
          lock: { mode: 'pessimistic_write' },
        });
        if (!stock) {
          stock = await manager.save(UnpublishedStockEntity, manager.create(UnpublishedStockEntity, {
            organizationId: input.organizationId,
            locationId: allocation.locationId,
            productId: item.productId,
            quantityOnHand: 0,
            averageCost: 0,
          }));
        }
        const before = Number(stock.quantityOnHand);
        const after = before + quantity;
        stock.averageCost = after > 0
          ? ((before * Number(stock.averageCost ?? 0)) + (quantity * Number(item.unitCost))) / after
          : Number(item.unitCost);
        stock.quantityOnHand = after;
        await manager.save(stock);
        await manager.save(UnpublishedStockMovementEntity, manager.create(UnpublishedStockMovementEntity, {
          unpublishedStockId: stock.id,
          locationId: allocation.locationId,
          productId: item.productId,
          performedById: input.performedById,
          movementType: EUnpublishedMovementType.StockIn,
          quantity,
          quantityBefore: before,
          quantityAfter: after,
          unitCost: Number(item.unitCost),
          notes: input.notes ?? `Black purchase ${po.poNumber}`,
        }));
        const allocationRecord = await manager.save(UnpublishedStockPurchaseItemAllocationEntity,
          manager.create(UnpublishedStockPurchaseItemAllocationEntity, {
            organizationId: input.organizationId,
            purchaseOrderId: po.id,
            purchaseItemId: item.id,
            locationId: allocation.locationId,
            quantity,
            performedById: input.performedById,
            notes: input.notes,
          }),
        );
        const value = Number((quantity * Number(item.unitCost)).toFixed(4));
        const recognizedBefore = await this.getAllocatedValue(manager, po.id);
        const { advanceApplied, payableCreated } = calculatePurchaseAllocationFunding(
          recognizedBefore,
          Number(po.amountPaid ?? 0),
          value,
        );
        await postBlackJournal(manager, {
          organizationId: input.organizationId,
          idempotencyKey: `black-purchase-allocation:${allocationRecord.id}`,
          sourceType: 'black_purchase_allocation',
          sourceId: allocationRecord.id,
          occurredAt: new Date(),
          description: `Black inventory allocation for ${po.poNumber}`,
          createdBy: input.performedById,
          lines: [
            { accountCode: BLACK_LEDGER_ACCOUNT_CODES.Inventory, debit: value, credit: 0, supplierId: po.supplierId, branchId: po.branchId, locationId: allocation.locationId },
            ...(advanceApplied > 0 ? [{ accountCode: BLACK_LEDGER_ACCOUNT_CODES.SupplierAdvances, debit: 0, credit: advanceApplied, supplierId: po.supplierId, branchId: po.branchId, locationId: allocation.locationId }] : []),
            ...(payableCreated > 0 ? [{ accountCode: BLACK_LEDGER_ACCOUNT_CODES.Payable, debit: 0, credit: payableCreated, supplierId: po.supplierId, branchId: po.branchId, locationId: allocation.locationId }] : []),
          ],
        });
        item.quantityAllocated = Number(item.quantityAllocated ?? 0) + quantity;
        await manager.save(item);
      }
      const items = await manager.find(UnpublishedStockPurchaseItemEntity, { where: { purchaseOrderId: po.id } });
      const fullyAllocated = items.length > 0 && items.every((item) =>
        Number(item.quantityReceived) > 0 && Number(item.quantityAllocated) === Number(item.quantityReceived),
      );
      po.status = fullyAllocated ? EPurchaseOrderStatus.Allocated : EPurchaseOrderStatus.PartiallyAllocated;
      await manager.save(po);
    });
    return this.getAsync(input.purchaseOrderId);
  }

  public async recordPaymentAsync(input: PayBlackPurchaseInput): Promise<UnpublishedStockPurchaseOrder> {
    if (!Number.isFinite(input.amount) || input.amount <= 0) throw new BadRequestException('Payment amount must be positive');
    if (!['CASH', 'CARD', 'UPI', 'NET_BANKING', 'CHEQUE'].includes(input.paymentMethod.toUpperCase())) {
      throw new BadRequestException('Unsupported payment method');
    }
    await this.internalRepo.manager.transaction(async (manager) => {
      const po = await manager.findOne(UnpublishedStockPurchaseOrderEntity, {
        where: { id: input.purchaseOrderId, organizationId: input.organizationId },
        lock: { mode: 'pessimistic_write' },
      });
      if (!po) throw new NotFoundException(`Black purchase order ${input.purchaseOrderId} not found`);
      if ([EPurchaseOrderStatus.Draft, EPurchaseOrderStatus.Cancelled].includes(po.status)) {
        throw new BadRequestException(`Cannot pay a purchase order in status "${po.status}"`);
      }
      const finalizedReturns = await manager.getRepository(UnpublishedStockPurchaseReturnEntity).createQueryBuilder('ret')
        .select('COALESCE(SUM(ret.totalAmount), 0)', 'value')
        .where('ret.purchaseOrderId = :purchaseOrderId', { purchaseOrderId: po.id })
        .andWhere('ret.status = :status', { status: EUnpublishedStockPurchaseReturnStatus.Finalized })
        .getRawOne<{ value: string }>();
      const remaining = Number(po.totalAmount) - Number(finalizedReturns?.value ?? 0) - Number(po.amountPaid ?? 0);
      if (input.amount > remaining) throw new BadRequestException(`Payment exceeds outstanding balance ${remaining}`);
      const payment = await manager.save(UnpublishedStockPOPaymentEntity, manager.create(UnpublishedStockPOPaymentEntity, {
        organizationId: input.organizationId,
        purchaseOrderId: po.id,
        supplierId: po.supplierId,
        amount: input.amount,
        paymentMethod: input.paymentMethod,
        paidAt: input.paidAt,
        note: input.note,
        performedById: input.performedById,
      }));
      const recognized = await this.getAllocatedValue(manager, po.id);
      const { payablePaid: payablePart, advanceCreated: advancePart } = calculatePurchasePaymentFunding(
        recognized,
        Number(po.amountPaid ?? 0),
        input.amount,
      );
      const paymentAccount = input.paymentMethod.toUpperCase() === 'CASH'
        ? BLACK_LEDGER_ACCOUNT_CODES.Cash
        : BLACK_LEDGER_ACCOUNT_CODES.Bank;
      await postBlackJournal(manager, {
        organizationId: input.organizationId,
        idempotencyKey: `black-purchase-payment:${payment.id}`,
        sourceType: 'black_purchase_payment',
        sourceId: payment.id,
        occurredAt: input.paidAt,
        description: `Black supplier payment for ${po.poNumber}`,
        createdBy: input.performedById,
        lines: [
          ...(payablePart > 0 ? [{ accountCode: BLACK_LEDGER_ACCOUNT_CODES.Payable, debit: payablePart, credit: 0, supplierId: po.supplierId, branchId: po.branchId }] : []),
          ...(advancePart > 0 ? [{ accountCode: BLACK_LEDGER_ACCOUNT_CODES.SupplierAdvances, debit: advancePart, credit: 0, supplierId: po.supplierId, branchId: po.branchId }] : []),
          { accountCode: paymentAccount, debit: 0, credit: input.amount, supplierId: po.supplierId, branchId: po.branchId },
        ],
      });
      po.amountPaid = Number(po.amountPaid ?? 0) + input.amount;
      await manager.save(po);
    });
    return this.getAsync(input.purchaseOrderId);
  }

  public async createAndFinalizeReturnAsync(input: CreateBlackPurchaseReturnInput): Promise<BlackPurchaseReturnResult> {
    if (!input.items.length) throw new BadRequestException('At least one return item is required');
    return this.internalRepo.manager.transaction(async (manager) => {
      const po = await manager.findOne(UnpublishedStockPurchaseOrderEntity, {
        where: { id: input.purchaseOrderId, organizationId: input.organizationId },
        lock: { mode: 'pessimistic_write' },
      });
      if (!po) throw new NotFoundException(`Black purchase order ${input.purchaseOrderId} not found`);
      if ([EPurchaseOrderStatus.Draft, EPurchaseOrderStatus.Ordered, EPurchaseOrderStatus.Cancelled].includes(po.status)) {
        throw new BadRequestException(`Cannot return allocated stock in status "${po.status}"`);
      }

      const ret = await manager.save(UnpublishedStockPurchaseReturnEntity, manager.create(UnpublishedStockPurchaseReturnEntity, {
        returnNumber: `BSPR-${new Date().getUTCFullYear()}-${randomUUID().slice(0, 8).toUpperCase()}`,
        organizationId: input.organizationId,
        purchaseOrderId: po.id,
        supplierId: po.supplierId,
        status: EUnpublishedStockPurchaseReturnStatus.Draft,
        reason: input.reason,
        notes: input.notes,
        createdById: input.createdById,
        totalAmount: 0,
      }));

      let totalAmount = 0;
      const inventoryLines: Array<{ accountCode: string; debit: number; credit: number; supplierId: string; branchId?: string; locationId: string }> = [];
      for (const request of [...input.items].sort((a, b) => `${a.locationId}:${a.purchaseItemId}`.localeCompare(`${b.locationId}:${b.purchaseItemId}`))) {
        const quantity = Number(request.quantity);
        if (!Number.isFinite(quantity) || quantity <= 0) throw new BadRequestException('Return quantity must be positive');
        const item = await manager.findOne(UnpublishedStockPurchaseItemEntity, {
          where: { id: request.purchaseItemId, purchaseOrderId: po.id }, lock: { mode: 'pessimistic_write' },
        });
        if (!item) throw new NotFoundException(`Purchase item ${request.purchaseItemId} not found`);
        const location = await manager.findOne(LocationEntity, { where: { id: request.locationId, organizationId: input.organizationId } });
        if (!location || (po.branchId && location.branchId !== po.branchId)) throw new BadRequestException('Return location is outside the purchase order branch');

        const allocatedRow = await manager.getRepository(UnpublishedStockPurchaseItemAllocationEntity).createQueryBuilder('allocation')
          .select('COALESCE(SUM(allocation.quantity), 0)', 'quantity')
          .where('allocation.purchaseItemId = :purchaseItemId AND allocation.locationId = :locationId', request).getRawOne<{ quantity: string }>();
        const returnedRow = await manager.getRepository(UnpublishedStockPurchaseReturnItemEntity).createQueryBuilder('returnItem')
          .innerJoin(UnpublishedStockPurchaseReturnEntity, 'purchaseReturn', 'purchaseReturn.id = returnItem.purchaseReturnId')
          .select('COALESCE(SUM(returnItem.quantity), 0)', 'quantity')
          .where('returnItem.purchaseItemId = :purchaseItemId AND returnItem.locationId = :locationId', request)
          .andWhere('purchaseReturn.status = :status', { status: EUnpublishedStockPurchaseReturnStatus.Finalized }).getRawOne<{ quantity: string }>();
        const returnable = Number(allocatedRow?.quantity ?? 0) - Number(returnedRow?.quantity ?? 0);
        if (quantity > returnable) throw new BadRequestException(`Return exceeds allocated quantity. Available: ${returnable}`);

        await manager.query('SELECT pg_advisory_xact_lock(hashtext($1))', [`black-stock:${input.organizationId}:${request.locationId}:${item.productId}`]);
        const stock = await manager.findOne(UnpublishedStockEntity, {
          where: { organizationId: input.organizationId, locationId: request.locationId, productId: item.productId }, lock: { mode: 'pessimistic_write' },
        });
        if (!stock || Number(stock.quantityOnHand) < quantity) throw new BadRequestException('Insufficient black stock for purchase return');
        const before = Number(stock.quantityOnHand);
        stock.quantityOnHand = before - quantity;
        await manager.save(stock);
        await manager.save(UnpublishedStockMovementEntity, manager.create(UnpublishedStockMovementEntity, {
          unpublishedStockId: stock.id, locationId: request.locationId, productId: item.productId,
          performedById: input.createdById, movementType: EUnpublishedMovementType.PurchaseReturn,
          quantity, quantityBefore: before, quantityAfter: stock.quantityOnHand, unitCost: Number(item.unitCost),
          notes: input.notes ?? `Black purchase return ${ret.returnNumber}`,
        }));
        const lineTotal = Number((quantity * Number(item.unitCost)).toFixed(4));
        totalAmount += lineTotal;
        await manager.save(UnpublishedStockPurchaseReturnItemEntity, manager.create(UnpublishedStockPurchaseReturnItemEntity, {
          purchaseReturnId: ret.id, purchaseItemId: item.id, productId: item.productId, locationId: request.locationId,
          quantity, unitCost: Number(item.unitCost), lineTotal, reason: request.reason,
        }));
        inventoryLines.push({ accountCode: BLACK_LEDGER_ACCOUNT_CODES.Inventory, debit: 0, credit: lineTotal, supplierId: po.supplierId, branchId: po.branchId, locationId: request.locationId });
      }

      totalAmount = Number(totalAmount.toFixed(4));
      const recognized = await this.getAllocatedValue(manager, po.id);
      const previousReturns = await manager.getRepository(UnpublishedStockPurchaseReturnEntity).createQueryBuilder('ret')
        .select('COALESCE(SUM(ret.totalAmount), 0)', 'value').where('ret.purchaseOrderId = :purchaseOrderId', { purchaseOrderId: po.id })
        .andWhere('ret.status = :status', { status: EUnpublishedStockPurchaseReturnStatus.Finalized }).getRawOne<{ value: string }>();
      const { payableReduction, supplierCredit } = calculatePurchaseReturnSettlement(
        recognized,
        Number(previousReturns?.value ?? 0),
        Number(po.amountPaid ?? 0),
        totalAmount,
      );
      await postBlackJournal(manager, {
        organizationId: input.organizationId, idempotencyKey: `black-purchase-return:${ret.id}`,
        sourceType: 'black_purchase_return', sourceId: ret.id, occurredAt: new Date(),
        description: `Black purchase return ${ret.returnNumber}`, createdBy: input.createdById,
        lines: [
          ...(payableReduction > 0 ? [{ accountCode: BLACK_LEDGER_ACCOUNT_CODES.Payable, debit: payableReduction, credit: 0, supplierId: po.supplierId, branchId: po.branchId }] : []),
          ...(supplierCredit > 0 ? [{ accountCode: BLACK_LEDGER_ACCOUNT_CODES.SupplierAdvances, debit: supplierCredit, credit: 0, supplierId: po.supplierId, branchId: po.branchId }] : []),
          ...inventoryLines,
        ],
      });
      ret.totalAmount = totalAmount;
      ret.supplierCreditAmount = supplierCredit;
      ret.refundedAmount = 0;
      ret.status = EUnpublishedStockPurchaseReturnStatus.Finalized;
      ret.finalizedAt = new Date();
      ret.finalizedById = input.createdById;
      await manager.save(ret);
      return { id: ret.id, returnNumber: ret.returnNumber, totalAmount, status: ret.status };
    });
  }

  public async recordReturnRefundAsync(input: RecordBlackPurchaseReturnRefundInput): Promise<BlackPurchaseReturnRefundResult> {
    const amount = Number(input.amount);
    if (!Number.isFinite(amount) || amount <= 0) throw new BadRequestException('Refund amount must be positive');
    const paymentMethod = input.paymentMethod.toUpperCase();
    if (!['CASH', 'CARD', 'UPI', 'NET_BANKING', 'CHEQUE'].includes(paymentMethod)) {
      throw new BadRequestException('Unsupported refund method');
    }
    return this.internalRepo.manager.transaction(async (manager) => {
      const po = await manager.findOne(UnpublishedStockPurchaseOrderEntity, {
        where: { id: input.purchaseOrderId, organizationId: input.organizationId }, lock: { mode: 'pessimistic_write' },
      });
      if (!po) throw new NotFoundException(`Black purchase order ${input.purchaseOrderId} not found`);
      const ret = await manager.findOne(UnpublishedStockPurchaseReturnEntity, {
        where: { id: input.purchaseReturnId, purchaseOrderId: po.id, organizationId: input.organizationId },
        lock: { mode: 'pessimistic_write' },
      });
      if (!ret) throw new NotFoundException(`Black purchase return ${input.purchaseReturnId} not found`);
      if (ret.status !== EUnpublishedStockPurchaseReturnStatus.Finalized) {
        throw new BadRequestException('Only finalized black purchase returns can receive refunds');
      }
      const outstandingCredit = calculateSupplierCreditOutstanding(
        Number(ret.supplierCreditAmount ?? 0),
        Number(ret.refundedAmount ?? 0),
      );
      if (amount > outstandingCredit) throw new BadRequestException(`Refund exceeds outstanding supplier credit ${outstandingCredit}`);
      const refund = await manager.save(UnpublishedStockPurchaseReturnRefundEntity, manager.create(UnpublishedStockPurchaseReturnRefundEntity, {
        organizationId: input.organizationId, purchaseReturnId: ret.id, supplierId: ret.supplierId,
        amount, paymentMethod, receivedAt: input.receivedAt, note: input.note, performedById: input.performedById,
      }));
      const receiptAccount = paymentMethod === 'CASH' ? BLACK_LEDGER_ACCOUNT_CODES.Cash : BLACK_LEDGER_ACCOUNT_CODES.Bank;
      await postBlackJournal(manager, {
        organizationId: input.organizationId, idempotencyKey: `black-purchase-return-refund:${refund.id}`,
        sourceType: 'black_purchase_return_refund', sourceId: refund.id, occurredAt: input.receivedAt,
        description: `Supplier refund for ${ret.returnNumber}`, createdBy: input.performedById,
        lines: [
          { accountCode: receiptAccount, debit: amount, credit: 0, supplierId: ret.supplierId, branchId: po.branchId },
          { accountCode: BLACK_LEDGER_ACCOUNT_CODES.SupplierAdvances, debit: 0, credit: amount, supplierId: ret.supplierId, branchId: po.branchId },
        ],
      });
      ret.refundedAmount = Number((Number(ret.refundedAmount ?? 0) + amount).toFixed(4));
      await manager.save(ret);
      return { id: refund.id, amount, refundedAmount: ret.refundedAmount, outstandingCredit: Number((outstandingCredit - amount).toFixed(4)) };
    });
  }

  public async updateDraftAsync(
    id: string,
    patch: { expectedAt?: string; notes?: string; status?: EPurchaseOrderStatus },
  ): Promise<UnpublishedStockPurchaseOrder> {
    await this.internalRepo.manager.transaction(async (manager) => {
      const po = await manager.findOne(UnpublishedStockPurchaseOrderEntity, {
        where: { id },
        lock: { mode: 'pessimistic_write' },
      });
      if (!po) throw new NotFoundException(`Black purchase order ${id} not found`);
      if (po.status !== EPurchaseOrderStatus.Draft) {
        throw new BadRequestException('Only draft black purchase orders can be updated or cancelled');
      }
      if (patch.expectedAt !== undefined) po.expectedAt = new Date(patch.expectedAt);
      if (patch.notes !== undefined) po.notes = patch.notes;
      if (patch.status) po.status = patch.status;
      await manager.save(po);
    });
    return this.getAsync(id);
  }

  public async deleteDraftAsync(id: string): Promise<void> {
    await this.internalRepo.manager.transaction(async (manager) => {
      const po = await manager.findOne(UnpublishedStockPurchaseOrderEntity, {
        where: { id },
        lock: { mode: 'pessimistic_write' },
      });
      if (!po) throw new NotFoundException(`Black purchase order ${id} not found`);
      if (po.status !== EPurchaseOrderStatus.Draft || Number(po.amountPaid ?? 0) !== 0) {
        throw new BadRequestException('Only unpaid draft black purchase orders can be deleted');
      }
      await manager.delete(UnpublishedStockPurchaseOrderEntity, { id });
    });
  }

  private async getAllocatedValue(manager: import('typeorm').EntityManager, purchaseOrderId: string): Promise<number> {
    const row = await manager.getRepository(UnpublishedStockPurchaseItemEntity)
      .createQueryBuilder('item')
      .select('COALESCE(SUM(item.quantityAllocated * item.unitCost), 0)', 'value')
      .where('item.purchaseOrderId = :purchaseOrderId', { purchaseOrderId })
      .getRawOne<{ value: string }>();
    return Number(row?.value ?? 0);
  }
}
