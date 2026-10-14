import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { EntityManager, FindManyOptions, In, Repository } from 'typeorm';
import { BaseRepo, DbException, Filter, PageableFilter } from '../../../common';
import { SalesReturn, SalesReturnFilter, ISalesReturnRepo, shouldApplySalesReturnLocationScope, UpdateSalesReturnRecord } from '../../../application/modules/sales-returns';
import {
  BillEntity,
  BillItemEntity,
  CustomerCreditTransactionEntity,
  CustomerEntity,
  CommissionPayableEntity,
  EBillStatus,
  ECreditTransactionType,
  EMovementType,
  ESaleType,
  ESalesReturnItemCondition,
  ESalesReturnRefundStatus,
  ESalesReturnStatus,
  EUnpublishedMovementType,
  InventoryEntity,
  PaymentTransactionEntity,
  SalesReturnEntity,
  SalesReturnItemEntity,
  StockMovementEntity,
  UnpublishedStockEntity,
  UnpublishedStockMovementEntity,
} from '../entities';
import {
  BLACK_LEDGER_ACCOUNT_CODES,
  calculateCommissionReversal,
  OFFICIAL_ACCOUNT_CODES,
} from '../../../application/modules/accounting';
import { postBlackJournal, postOfficialJournal } from './ledger-posting';
import { roundReturnMoney } from '../../../application/shared/helpers';

@Injectable()
export class SalesReturnRepo
  extends BaseRepo<SalesReturnEntity, SalesReturn, string, PageableFilter<SalesReturnFilter>, Filter<SalesReturnFilter>>
  implements ISalesReturnRepo
{
  constructor(
    @InjectRepository(SalesReturnEntity) internalRepo: Repository<SalesReturnEntity>,
    @InjectMapper() mapper: Mapper,
    @InjectPinoLogger(SalesReturnRepo.name) logger: PinoLogger,
  ) {
    super(internalRepo, mapper, logger, SalesReturnEntity, SalesReturn);
  }

  public override get idColumnName(): keyof SalesReturnEntity {
    return 'id';
  }

  public override get specialFilterFields(): (keyof PageableFilter<SalesReturnFilter>)[] {
    return [...super.specialFilterFields, 'accessibleLocationIds'] as any;
  }

  public async getWithItemsAsync(id: string): Promise<SalesReturn | null> {
    try {
      const entity = await this.internalRepo.findOne({
        where: { id },
        relations: { items: true },
        order: { items: { createdAt: 'ASC' } },
      });
      return entity ? this.mapToModel(entity) : null;
    } catch (ex) {
      this.logger.error(ex);
      throw new DbException(ex);
    }
  }

  public override async getAsync(id: string): Promise<SalesReturn> {
    return this.getWithItemsAsync(id);
  }

  protected override modifyFindOption(
    findOpts: FindManyOptions<SalesReturnEntity>,
    filterObj: Filter<SalesReturnFilter> | PageableFilter<SalesReturnFilter>,
  ): void {
    const filter = filterObj as SalesReturnFilter;
    if (shouldApplySalesReturnLocationScope(filter?.accessibleLocationIds, filter?.locationId)) {
      findOpts.where = { ...(findOpts.where as object), locationId: In(filter.accessibleLocationIds) };
    }
  }

  public async finalizeAsync(id: string, performedById: string): Promise<SalesReturn> {
    await this.internalRepo.manager.transaction(async (manager) => {
      const ret = await manager.findOne(SalesReturnEntity, {
        where: { id },
        relations: { items: true },
        lock: { mode: 'pessimistic_write' },
      });
      if (!ret) throw new NotFoundException(`Sales return ${id} not found`);
      if (ret.status === ESalesReturnStatus.Finalized) return;
      if (ret.status === ESalesReturnStatus.Cancelled) {
        throw new BadRequestException('Cancelled sales returns cannot be finalized');
      }
      if (!ret.items?.length) throw new BadRequestException('At least one return item is required');

      const bill = await manager.findOne(BillEntity, {
        where: { id: ret.billId, organizationId: ret.organizationId },
      });
      if (!bill) throw new NotFoundException(`Bill ${ret.billId} not found`);
      if (bill.status !== EBillStatus.Completed) {
        throw new BadRequestException('Sales returns are allowed only for completed bills');
      }
      if (
        ret.locationId !== bill.locationId ||
        ret.saleType !== bill.saleType ||
        ret.customerId !== bill.customerId
      ) {
        throw new BadRequestException('Sales return header does not match its source bill');
      }

      let returnedInventoryCost = 0;
      let subtotal = 0;
      let taxAmount = 0;
      let discountAmount = 0;
      let totalAmount = 0;
      for (const item of [...ret.items].sort((a, b) => a.billItemId.localeCompare(b.billItemId))) {
        const source = await manager.findOne(BillItemEntity, {
          where: { id: item.billItemId, billId: bill.id },
          lock: { mode: 'pessimistic_write' },
        });
        if (!source) throw new BadRequestException(`Bill item ${item.billItemId} is no longer available`);
        if (item.productId !== source.productId || item.variantId !== source.variantId) {
          throw new BadRequestException(`Return item ${item.id} does not match its source bill item`);
        }
        const quantity = Number(item.quantity);
        if (!Number.isFinite(quantity) || quantity <= 0) {
          throw new BadRequestException('Return quantity must be greater than zero');
        }
        item.unitPrice = Number(source.unitPrice);
        item.taxRate = Number(source.taxRate ?? 0);
        item.discountAmount = roundReturnMoney(
          (Number(source.discountAmount ?? 0) * quantity) / Number(source.quantity),
        );
        const gross = roundReturnMoney(quantity * item.unitPrice);
        const taxable = Math.max(roundReturnMoney(gross - item.discountAmount), 0);
        item.taxAmount = roundReturnMoney((taxable * item.taxRate) / 100);
        item.lineTotal = roundReturnMoney(taxable + item.taxAmount);
        await manager.save(item);
        subtotal += gross;
        discountAmount += item.discountAmount;
        taxAmount += item.taxAmount;
        totalAmount += item.lineTotal;
        const prior = await manager
          .getRepository(SalesReturnItemEntity)
          .createQueryBuilder('item')
          .innerJoin(SalesReturnEntity, 'return', 'return.id = item.salesReturnId')
          .select('COALESCE(SUM(item.quantity), 0)', 'quantity')
          .where('item.billItemId = :billItemId', { billItemId: item.billItemId })
          .andWhere('return.status = :status', { status: ESalesReturnStatus.Finalized })
          .andWhere('return.id <> :returnId', { returnId: ret.id })
          .getRawOne<{ quantity: string }>();
        const returnable = Number(source.quantity) - Number(prior?.quantity ?? 0);
        if (Number(item.quantity) > returnable) {
          throw new BadRequestException(`Returnable quantity for bill item ${item.billItemId} is ${returnable}`);
        }
        if (item.condition === ESalesReturnItemCondition.UnpublishedRestock && bill.saleType !== ESaleType.Black) {
          throw new BadRequestException('Unpublished restock is allowed only for black sales');
        }
        if (bill.saleType === ESaleType.Black && item.condition === ESalesReturnItemCondition.Restock) {
          throw new BadRequestException('Black sale stock can only be damaged or returned to unpublished stock');
        }

        if (item.condition === ESalesReturnItemCondition.Restock) {
          returnedInventoryCost += await this.restockOfficial(manager, ret, item, source, performedById);
        } else if (item.condition === ESalesReturnItemCondition.UnpublishedRestock) {
          returnedInventoryCost += await this.restockBlack(manager, ret, item, source, performedById);
        } else {
          await this.recordDamage(manager, ret, item, performedById);
        }
      }

      ret.subtotal = roundReturnMoney(subtotal);
      ret.discountAmount = roundReturnMoney(discountAmount);
      ret.taxAmount = roundReturnMoney(taxAmount);
      ret.totalAmount = roundReturnMoney(totalAmount);

      let receivableReversed = 0;
      let refundedAmount = 0;
      if (bill.saleType === ESaleType.Credit && bill.customerId) {
        ({ creditApplied: receivableReversed, refundAmount: refundedAmount } =
          await this.reverseCustomerCredit(manager, ret, bill.customerId, performedById));
      } else if (bill.saleType === ESaleType.Credit) {
        throw new BadRequestException('Credit sale return requires a customer');
      } else if (bill.saleType === ESaleType.Normal) {
        this.assertRefundMethod(ret.refundMethod);
        refundedAmount = Number(ret.totalAmount);
        await manager.save(PaymentTransactionEntity, manager.create(PaymentTransactionEntity, {
          orgId: ret.organizationId,
          referenceId: ret.id,
          referenceType: 'sales_return',
          type: 'refund',
          method: ret.refundMethod,
          amount: ret.totalAmount,
          status: 'completed',
        }));
        ret.refundStatus = ESalesReturnRefundStatus.Completed;
      } else if (bill.saleType === ESaleType.Black) {
        this.assertRefundMethod(ret.refundMethod);
        refundedAmount = Number(ret.totalAmount);
        ret.refundStatus = ESalesReturnRefundStatus.Completed;
      }

      await this.postReturnJournal(
        manager,
        ret,
        bill,
        returnedInventoryCost,
        receivableReversed,
        refundedAmount,
        performedById,
      );

      ret.status = ESalesReturnStatus.Finalized;
      ret.finalizedById = performedById;
      ret.finalizedAt = new Date();
      await manager.save(ret);
    });
    return this.getWithItemsAsync(id);
  }

  public async updateDraftAsync(input: UpdateSalesReturnRecord): Promise<SalesReturn> {
    await this.internalRepo.manager.transaction(async (manager) => {
      const ret = await manager.findOne(SalesReturnEntity, {
        where: { id: input.id },
        lock: { mode: 'pessimistic_write' },
      });
      if (!ret) throw new NotFoundException(`Sales return ${input.id} not found`);
      if (ret.status !== ESalesReturnStatus.Draft) {
        throw new BadRequestException('Only draft sales returns can be updated');
      }
      if (input.reason !== undefined) ret.reason = input.reason;
      if (input.notes !== undefined) ret.notes = input.notes;
      if (input.refundMethod !== undefined) ret.refundMethod = input.refundMethod;
      if (input.items) {
        ret.subtotal = Number(input.subtotal);
        ret.taxAmount = Number(input.taxAmount);
        ret.discountAmount = Number(input.discountAmount);
        ret.totalAmount = Number(input.totalAmount);
        await manager.delete(SalesReturnItemEntity, { salesReturnId: ret.id });
        await manager.save(SalesReturnItemEntity, input.items.map((item) =>
          manager.create(SalesReturnItemEntity, { ...item, id: undefined, salesReturnId: ret.id }),
        ));
      }
      await manager.save(ret);
    });
    return this.getWithItemsAsync(input.id);
  }

  private async lockedStock(manager: EntityManager, ret: SalesReturnEntity, productId: string) {
    await manager.query('SELECT pg_advisory_xact_lock(hashtext($1))', [
      `inventory:${ret.organizationId}:${ret.locationId}:${productId}`,
    ]);
    let stock = await manager.findOne(InventoryEntity, {
      where: { organizationId: ret.organizationId, locationId: ret.locationId, productId },
      lock: { mode: 'pessimistic_write' },
    });
    if (!stock) {
      stock = await manager.save(InventoryEntity, manager.create(InventoryEntity, {
        organizationId: ret.organizationId,
        locationId: ret.locationId,
        productId,
        quantityOnHand: 0,
        quantityReserved: 0,
        reorderLevel: 0,
      }));
    }
    return stock;
  }

  private async restockOfficial(manager: EntityManager, ret: SalesReturnEntity, item: SalesReturnItemEntity, source: BillItemEntity, performedById: string): Promise<number> {
    const stock = await this.lockedStock(manager, ret, item.productId);
    const before = Number(stock.quantityOnHand);
    const unitCost = Number(source.unitCostSnapshot ?? stock.averageCost ?? 0);
    stock.quantityOnHand = before + Number(item.quantity);
    const totalQuantity = Number(stock.quantityOnHand);
    stock.averageCost = totalQuantity > 0
      ? ((before * Number(stock.averageCost ?? 0)) + (Number(item.quantity) * unitCost)) / totalQuantity
      : unitCost;
    await manager.save(stock);
    await manager.save(StockMovementEntity, manager.create(StockMovementEntity, {
      inventoryId: stock.id, locationId: ret.locationId, productId: item.productId, performedById,
      referenceId: ret.id, referenceType: 'sales_return', movementType: EMovementType.Return,
      quantity: item.quantity, quantityBefore: before, quantityAfter: stock.quantityOnHand,
      notes: `Sales return ${ret.returnNumber}`,
    }));
    return Number((Number(item.quantity) * unitCost).toFixed(4));
  }

  private async recordDamage(manager: EntityManager, ret: SalesReturnEntity, item: SalesReturnItemEntity, performedById: string) {
    const stock = await this.lockedStock(manager, ret, item.productId);
    const quantity = Number(stock.quantityOnHand);
    await manager.save(StockMovementEntity, manager.create(StockMovementEntity, {
      inventoryId: stock.id, locationId: ret.locationId, productId: item.productId, performedById,
      referenceId: ret.id, referenceType: 'sales_return', movementType: EMovementType.Damage,
      quantity: item.quantity, quantityBefore: quantity, quantityAfter: quantity,
      notes: `Damaged sales return ${ret.returnNumber}`,
    }));
  }

  private async restockBlack(manager: EntityManager, ret: SalesReturnEntity, item: SalesReturnItemEntity, source: BillItemEntity, performedById: string): Promise<number> {
    await manager.query('SELECT pg_advisory_xact_lock(hashtext($1))', [
      `black-stock:${ret.organizationId}:${ret.locationId}:${item.productId}`,
    ]);
    let stock = await manager.findOne(UnpublishedStockEntity, {
      where: { organizationId: ret.organizationId, locationId: ret.locationId, productId: item.productId },
      lock: { mode: 'pessimistic_write' },
    });
    if (!stock) {
      stock = await manager.save(UnpublishedStockEntity, manager.create(UnpublishedStockEntity, {
        organizationId: ret.organizationId, locationId: ret.locationId, productId: item.productId,
        quantityOnHand: 0,
      }));
    }
    const before = Number(stock.quantityOnHand);
    const unitCost = Number(source.unitCostSnapshot ?? stock.averageCost ?? 0);
    stock.quantityOnHand = before + Number(item.quantity);
    const totalQuantity = Number(stock.quantityOnHand);
    stock.averageCost = totalQuantity > 0
      ? ((before * Number(stock.averageCost ?? 0)) + (Number(item.quantity) * unitCost)) / totalQuantity
      : unitCost;
    await manager.save(stock);
    await manager.save(UnpublishedStockMovementEntity, manager.create(UnpublishedStockMovementEntity, {
      unpublishedStockId: stock.id, locationId: ret.locationId, productId: item.productId,
      performedById, movementType: EUnpublishedMovementType.StockIn, quantity: item.quantity,
      quantityBefore: before, quantityAfter: stock.quantityOnHand, notes: `Sales return ${ret.returnNumber}`,
    }));
    return Number((Number(item.quantity) * unitCost).toFixed(4));
  }

  private async reverseCustomerCredit(manager: EntityManager, ret: SalesReturnEntity, customerId: string, performedById: string): Promise<{ creditApplied: number; refundAmount: number }> {
    const customer = await manager.findOne(CustomerEntity, {
      where: { id: customerId, organizationId: ret.organizationId },
      lock: { mode: 'pessimistic_write' },
    });
    if (!customer) throw new NotFoundException(`Customer ${customerId} not found`);
    const before = Number(customer.creditBalance ?? 0);
    const creditApplied = Math.min(before, Number(ret.totalAmount));
    const refundAmount = Number(ret.totalAmount) - creditApplied;
    if (refundAmount > 0 && !ret.refundMethod) {
      throw new BadRequestException(`Refund method is required for ${refundAmount}`);
    }
    if (refundAmount > 0) this.assertRefundMethod(ret.refundMethod);
    customer.creditBalance = before - creditApplied;
    await manager.save(customer);
    if (creditApplied > 0) {
      await manager.save(CustomerCreditTransactionEntity, manager.create(CustomerCreditTransactionEntity, {
        customerId, billId: ret.billId, type: ECreditTransactionType.SalesReturn,
        amount: creditApplied, balanceBefore: before, balanceAfter: customer.creditBalance,
        performedById, note: `Sales return ${ret.returnNumber}`,
      }));
    }
    if (refundAmount > 0) {
      await manager.save(PaymentTransactionEntity, manager.create(PaymentTransactionEntity, {
        orgId: ret.organizationId, referenceId: ret.id, referenceType: 'sales_return', type: 'refund',
        method: ret.refundMethod, amount: refundAmount, status: 'completed',
      }));
      ret.refundStatus = ESalesReturnRefundStatus.Completed;
    }
    return { creditApplied, refundAmount };
  }

  private async postReturnJournal(
    manager: EntityManager,
    ret: SalesReturnEntity,
    bill: BillEntity,
    inventoryCost: number,
    receivableReversed: number,
    refundedAmount: number,
    performedById: string,
  ): Promise<void> {
    const amount = (value: number) => Number(value.toFixed(4));
    const total = amount(Number(ret.totalAmount));
    const tax = amount(Number(ret.taxAmount ?? 0));
    const revenue = amount(total - tax);
    const cost = amount(inventoryCost);
    const refundAccount = String(ret.refundMethod).toUpperCase() === 'CASH'
      ? OFFICIAL_ACCOUNT_CODES.Cash
      : OFFICIAL_ACCOUNT_CODES.Bank;

    if (bill.saleType === ESaleType.Black) {
      const blackRefundAccount = String(ret.refundMethod).toUpperCase() === 'CASH'
        ? BLACK_LEDGER_ACCOUNT_CODES.Cash
        : BLACK_LEDGER_ACCOUNT_CODES.Bank;
      const commission = calculateCommissionReversal(
        Number(bill.commissionAmount ?? 0),
        Number(bill.totalAmount),
        total,
      );
      await postBlackJournal(manager, {
        organizationId: ret.organizationId,
        idempotencyKey: `sales-return:${ret.id}:finalization`,
        sourceType: 'sales_return',
        sourceId: ret.id,
        occurredAt: new Date(),
        description: `Black sales return ${ret.returnNumber}`,
        createdBy: performedById,
        lines: [
          { accountCode: BLACK_LEDGER_ACCOUNT_CODES.SalesRevenue, debit: total, credit: 0, locationId: ret.locationId, customerId: bill.customerId },
          { accountCode: blackRefundAccount, debit: 0, credit: total, locationId: ret.locationId, customerId: bill.customerId },
          ...(cost > 0 ? [
            { accountCode: BLACK_LEDGER_ACCOUNT_CODES.Inventory, debit: cost, credit: 0, locationId: ret.locationId },
            { accountCode: BLACK_LEDGER_ACCOUNT_CODES.CostOfGoodsSold, debit: 0, credit: cost, locationId: ret.locationId },
          ] : []),
          ...(commission > 0 ? [
            { accountCode: BLACK_LEDGER_ACCOUNT_CODES.CommissionPayable, debit: commission, credit: 0, locationId: ret.locationId },
            { accountCode: BLACK_LEDGER_ACCOUNT_CODES.CommissionExpense, debit: 0, credit: commission, locationId: ret.locationId },
          ] : []),
        ],
      });
      if (commission > 0) {
        const payable = await manager.findOne(CommissionPayableEntity, {
          where: { billId: bill.id, organizationId: bill.organizationId },
          lock: { mode: 'pessimistic_write' },
        });
        if (payable) {
          payable.amount = Math.max(Number(payable.amount) - commission, 0);
          await manager.save(payable);
        }
      }
      return;
    }

    await postOfficialJournal(manager, {
      organizationId: ret.organizationId,
      idempotencyKey: `sales-return:${ret.id}:finalization`,
      sourceType: 'sales_return',
      sourceId: ret.id,
      occurredAt: new Date(),
      description: `Sales return ${ret.returnNumber}`,
      createdBy: performedById,
      lines: [
        { accountCode: OFFICIAL_ACCOUNT_CODES.SalesRevenue, debit: revenue, credit: 0, locationId: ret.locationId, customerId: bill.customerId },
        ...(tax > 0 ? [{ accountCode: OFFICIAL_ACCOUNT_CODES.TaxPayable, debit: tax, credit: 0, locationId: ret.locationId, customerId: bill.customerId }] : []),
        ...(receivableReversed > 0 ? [{ accountCode: OFFICIAL_ACCOUNT_CODES.AccountsReceivable, debit: 0, credit: amount(receivableReversed), locationId: ret.locationId, customerId: bill.customerId }] : []),
        ...(refundedAmount > 0 ? [{ accountCode: refundAccount, debit: 0, credit: amount(refundedAmount), locationId: ret.locationId, customerId: bill.customerId }] : []),
        ...(cost > 0 ? [
          { accountCode: OFFICIAL_ACCOUNT_CODES.Inventory, debit: cost, credit: 0, locationId: ret.locationId },
          { accountCode: OFFICIAL_ACCOUNT_CODES.CostOfGoodsSold, debit: 0, credit: cost, locationId: ret.locationId },
        ] : []),
      ],
    });
  }

  private assertRefundMethod(method?: string): asserts method is string {
    const normalized = String(method ?? '').toUpperCase();
    if (!['CASH', 'CARD', 'UPI', 'NET_BANKING', 'CHEQUE'].includes(normalized)) {
      throw new BadRequestException('A valid refund method is required');
    }
  }
}
