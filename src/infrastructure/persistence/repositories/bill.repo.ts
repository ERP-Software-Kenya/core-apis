import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { BadRequestException, ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { Between, FindManyOptions, In, Not, Repository } from 'typeorm';
import { BaseRepo, DbException, Filter, PageableFilter } from '../../../common';
import {
  BillEntity,
  CommissionPayableEntity,
  CustomerCreditTransactionEntity,
  CustomerEntity,
  EBillStatus,
  ECommissionStatus,
  ECreditTransactionType,
  EMovementType,
  EPaymentMethod,
  EUnpublishedMovementType,
  ESaleType,
  InventoryEntity,
  StockMovementEntity,
  UnpublishedStockEntity,
  UnpublishedStockMovementEntity,
} from '../entities';
import { Bill } from '../../../application/modules/bills/domain';
import { BillFilter, CompleteBillInput, IBillRepo } from '../../../application/modules/bills';
import {
  BLACK_LEDGER_ACCOUNT_CODES,
  OFFICIAL_ACCOUNT_CODES,
} from '../../../application/modules/accounting';
import { postBlackJournal, postOfficialJournal } from './ledger-posting';

@Injectable()
export class BillRepo
  extends BaseRepo<BillEntity, Bill, string, PageableFilter<BillFilter>, Filter<BillFilter>>
  implements IBillRepo
{
  constructor(
    @InjectRepository(BillEntity) internalRepo: Repository<BillEntity>,
    @InjectMapper() mapper: Mapper,
    @InjectPinoLogger(BillRepo.name) logger: PinoLogger,
  ) {
    super(internalRepo, mapper, logger, BillEntity, Bill);
  }

  public override get idColumnName(): keyof BillEntity {
    return 'id';
  }

  public override get specialFilterFields(): (keyof (PageableFilter<BillFilter>))[] {
    return [...super.specialFilterFields, 'accessibleLocationIds', 'saleTypeNot'] as any;
  }

  public override get softDeleteEnabled(): boolean {
    return true;
  }

  /**
   * A single bill always carries its lines — the POS resume flow and the bill
   * detail screen both read them from here. List/search stay header-only on
   * purpose so pagination isn't paying for a join it doesn't render.
   */
  public override async getAsync(pk: string): Promise<Bill> {
    try {
      const entity = await this.internalRepo.findOne({
        where: { id: pk },
        relations: { items: true },
        order: { items: { createdAt: 'ASC' } },
      });
      return entity ? this.mapToModel(entity) : null;
    } catch (ex) {
      this.logger.error(ex);
      throw new DbException(ex);
    }
  }

  protected override modifyFindOption(
    findOpts: FindManyOptions<BillEntity>,
    filterObj: Filter<BillFilter> | PageableFilter<BillFilter>,
  ): void {
    const f = filterObj as BillFilter & { saleTypeNot?: string };
    if (f?.accessibleLocationIds !== undefined && !f.locationId) {
      findOpts.where = { ...(findOpts.where as object), locationId: In(f.accessibleLocationIds) };
    }
    if (f?.saleTypeNot) {
      findOpts.where = { ...(findOpts.where as object), saleType: Not(f.saleTypeNot) };
    }
  }

  public async countForDateAsync(date: Date): Promise<number> {
    const yr = date.getUTCFullYear(), mo = date.getUTCMonth(), dy = date.getUTCDate();
    const start = new Date(Date.UTC(yr, mo, dy, 0, 0, 0, 0));
    const end   = new Date(Date.UTC(yr, mo, dy, 23, 59, 59, 999));
    return this.internalRepo.count({ where: { createdAt: Between(start, end) }, withDeleted: true });
  }

  public async findBySourceOrderIdAsync(orderId: string): Promise<Bill | null> {
    try {
      const entity = await this.internalRepo.findOne({ where: { sourceOrderId: orderId } });
      return entity ? this.mapToModel(entity) : null;
    } catch (ex) {
      this.logger.error(ex);
      throw new DbException(ex);
    }
  }

  public async completeAsync(input: CompleteBillInput): Promise<Bill> {
    return this.internalRepo.manager.transaction(async (manager) => {
      const bill = await manager.findOne(BillEntity, {
        where: { id: input.billId },
        relations: { items: true },
        lock: { mode: 'pessimistic_write' },
      });
      if (!bill) throw new NotFoundException(`Bill ${input.billId} not found`);
      if (bill.status === EBillStatus.Completed) return this.mapToModel(bill);
      if (bill.status === EBillStatus.Cancelled) {
        throw new ConflictException('A cancelled bill cannot be completed');
      }
      if (!bill.items?.length) throw new BadRequestException('A bill requires at least one item');
      const settlementMethod = input.paymentMethod ?? bill.paymentMethod;
      if (bill.saleType === ESaleType.Credit) {
        if (settlementMethod && settlementMethod !== EPaymentMethod.Credit) {
          throw new BadRequestException('Credit sales must use the CREDIT payment method');
        }
      } else if (!settlementMethod || settlementMethod === EPaymentMethod.Credit) {
        throw new BadRequestException('Cash and black sales require a non-credit payment method');
      }

      let inventoryCost = 0;
      for (const item of bill.items) {
        const locationId = item.locationId ?? bill.locationId;
        if (bill.saleType === ESaleType.Black) {
          const stock = await manager.findOne(UnpublishedStockEntity, {
            where: { organizationId: bill.organizationId, locationId, productId: item.productId },
            lock: { mode: 'pessimistic_write' },
          });
          if (!stock) throw new BadRequestException(`No black stock for product ${item.productId}`);
          const before = Number(stock.quantityOnHand);
          if (Number(item.quantity) > before) {
            throw new BadRequestException(`Insufficient black stock. Available: ${before}`);
          }
          const unitCost = Number(stock.averageCost ?? 0);
          stock.quantityOnHand = before - Number(item.quantity);
          item.unitCostSnapshot = unitCost;
          inventoryCost += Number(item.quantity) * unitCost;
          await manager.save(stock);
          await manager.save(item);
          await manager.save(
            UnpublishedStockMovementEntity,
            manager.create(UnpublishedStockMovementEntity, {
              unpublishedStockId: stock.id,
              locationId,
              productId: item.productId,
              performedById: input.performedById,
              movementType: EUnpublishedMovementType.StockOut,
              quantity: Number(item.quantity),
              quantityBefore: before,
              quantityAfter: Number(stock.quantityOnHand),
              notes: `Black sale ${bill.billNumber}`,
            }),
          );
        } else {
          const stock = await manager.findOne(InventoryEntity, {
            where: { organizationId: bill.organizationId, locationId, productId: item.productId },
            lock: { mode: 'pessimistic_write' },
          });
          if (!stock) throw new BadRequestException(`No inventory for product ${item.productId}`);
          const before = Number(stock.quantityOnHand);
          if (Number(item.quantity) > before) {
            throw new BadRequestException(`Insufficient stock. Available: ${before}`);
          }
          const unitCost = Number(stock.averageCost ?? 0);
          stock.quantityOnHand = before - Number(item.quantity);
          item.unitCostSnapshot = unitCost;
          inventoryCost += Number(item.quantity) * unitCost;
          await manager.save(stock);
          await manager.save(item);
          await manager.save(
            StockMovementEntity,
            manager.create(StockMovementEntity, {
              inventoryId: stock.id,
              locationId,
              productId: item.productId,
              performedById: input.performedById,
              referenceId: bill.id,
              referenceType: 'bill',
              movementType: EMovementType.StockOut,
              quantity: Number(item.quantity),
              quantityBefore: before,
              quantityAfter: Number(stock.quantityOnHand),
              notes: `Sale ${bill.billNumber}`,
            }),
          );
        }
      }

      if (bill.saleType === ESaleType.Credit) {
        if (!bill.customerId) throw new BadRequestException('Credit sale requires a customer');
        const customer = await manager.findOne(CustomerEntity, {
          where: { id: bill.customerId, organizationId: bill.organizationId },
          lock: { mode: 'pessimistic_write' },
        });
        if (!customer) throw new NotFoundException(`Customer ${bill.customerId} not found`);
        const before = Number(customer.creditBalance ?? 0);
        const after = before + Number(bill.totalAmount);
        if (
          !input.creditLimitOverride &&
          customer.creditLimit != null &&
          after > Number(customer.creditLimit)
        ) {
          throw new ConflictException('Customer credit balance changed and now exceeds the credit limit');
        }
        customer.creditBalance = after;
        await manager.save(customer);
        await manager.save(
          CustomerCreditTransactionEntity,
          manager.create(CustomerCreditTransactionEntity, {
            customerId: customer.id,
            billId: bill.id,
            type: ECreditTransactionType.CreditSale,
            amount: Number(bill.totalAmount),
            balanceBefore: before,
            balanceAfter: after,
            performedById: input.performedById,
          }),
        );
      }

      if (
        bill.saleType === ESaleType.Black &&
        Number(bill.commissionAmount) > 0 &&
        (bill.facilitatorUserId || bill.facilitatorName)
      ) {
        await manager.save(
          CommissionPayableEntity,
          manager.create(CommissionPayableEntity, {
            organizationId: bill.organizationId,
            billId: bill.id,
            facilitatorUserId: bill.facilitatorUserId,
            facilitatorName: bill.facilitatorName,
            amount: Number(bill.commissionAmount),
            status: ECommissionStatus.Owed,
          }),
        );
      }

      const amount = (value: number) => Number(value.toFixed(4));
      const total = amount(Number(bill.totalAmount));
      const cost = amount(inventoryCost);
      if (bill.saleType === ESaleType.Black) {
        const blackSettlementAccount = String(input.paymentMethod ?? bill.paymentMethod).toUpperCase() === 'CASH'
          ? BLACK_LEDGER_ACCOUNT_CODES.Cash
          : BLACK_LEDGER_ACCOUNT_CODES.Bank;
        const lines = [
          {
            accountCode: blackSettlementAccount,
            debit: total,
            credit: 0,
            locationId: bill.locationId,
            customerId: bill.customerId,
          },
          {
            accountCode: BLACK_LEDGER_ACCOUNT_CODES.SalesRevenue,
            debit: 0,
            credit: total,
            locationId: bill.locationId,
            customerId: bill.customerId,
          },
          ...(cost > 0
            ? [
                {
                  accountCode: BLACK_LEDGER_ACCOUNT_CODES.CostOfGoodsSold,
                  debit: cost,
                  credit: 0,
                  locationId: bill.locationId,
                },
                {
                  accountCode: BLACK_LEDGER_ACCOUNT_CODES.Inventory,
                  debit: 0,
                  credit: cost,
                  locationId: bill.locationId,
                },
              ]
            : []),
          ...(Number(bill.commissionAmount) > 0
            ? [
                {
                  accountCode: BLACK_LEDGER_ACCOUNT_CODES.CommissionExpense,
                  debit: amount(Number(bill.commissionAmount)),
                  credit: 0,
                  locationId: bill.locationId,
                },
                {
                  accountCode: BLACK_LEDGER_ACCOUNT_CODES.CommissionPayable,
                  debit: 0,
                  credit: amount(Number(bill.commissionAmount)),
                  locationId: bill.locationId,
                },
              ]
            : []),
        ];
        await postBlackJournal(manager, {
          organizationId: bill.organizationId,
          idempotencyKey: `bill:${bill.id}:completion`,
          sourceType: 'bill',
          sourceId: bill.id,
          occurredAt: new Date(),
          description: `Black sale ${bill.billNumber}`,
          createdBy: input.performedById,
          lines,
        });
      } else {
        const tax = amount(Number(bill.taxAmount ?? 0));
        const revenue = amount(total - tax);
        const debitAccount = bill.saleType === ESaleType.Credit
          ? OFFICIAL_ACCOUNT_CODES.AccountsReceivable
          : String(input.paymentMethod).toUpperCase() === 'CASH'
            ? OFFICIAL_ACCOUNT_CODES.Cash
            : OFFICIAL_ACCOUNT_CODES.Bank;
        const lines = [
          {
            accountCode: debitAccount,
            debit: total,
            credit: 0,
            locationId: bill.locationId,
            customerId: bill.customerId,
          },
          {
            accountCode: OFFICIAL_ACCOUNT_CODES.SalesRevenue,
            debit: 0,
            credit: revenue,
            locationId: bill.locationId,
            customerId: bill.customerId,
          },
          ...(tax > 0
            ? [{
                accountCode: OFFICIAL_ACCOUNT_CODES.TaxPayable,
                debit: 0,
                credit: tax,
                locationId: bill.locationId,
                customerId: bill.customerId,
              }]
            : []),
          ...(cost > 0
            ? [
                {
                  accountCode: OFFICIAL_ACCOUNT_CODES.CostOfGoodsSold,
                  debit: cost,
                  credit: 0,
                  locationId: bill.locationId,
                },
                {
                  accountCode: OFFICIAL_ACCOUNT_CODES.Inventory,
                  debit: 0,
                  credit: cost,
                  locationId: bill.locationId,
                },
              ]
            : []),
        ];
        await postOfficialJournal(manager, {
          organizationId: bill.organizationId,
          idempotencyKey: `bill:${bill.id}:completion`,
          sourceType: 'bill',
          sourceId: bill.id,
          occurredAt: new Date(),
          description: `Sale ${bill.billNumber}`,
          createdBy: input.performedById,
          lines,
        });
      }

      bill.status = EBillStatus.Completed;
      bill.billedAt = new Date();
      if (input.paymentMethod) bill.paymentMethod = input.paymentMethod as never;
      return this.mapToModel(await manager.save(bill));
    });
  }

  public async transitionOpenBillAsync(id: string, status: EBillStatus, paymentMethod?: EPaymentMethod): Promise<Bill> {
    await this.internalRepo.manager.transaction(async (manager) => {
      const bill = await manager.findOne(BillEntity, { where: { id }, lock: { mode: 'pessimistic_write' } });
      if (!bill) throw new NotFoundException(`Bill ${id} not found`);
      const allowed: Record<EBillStatus, EBillStatus[]> = {
        [EBillStatus.Initiated]: [EBillStatus.Draft, EBillStatus.Cancelled],
        [EBillStatus.Draft]: [EBillStatus.Initiated, EBillStatus.Cancelled],
        [EBillStatus.Completed]: [],
        [EBillStatus.Cancelled]: [],
      };
      if (bill.status !== status && !allowed[bill.status].includes(status)) {
        throw new BadRequestException(`Cannot move bill from ${bill.status} to ${status}`);
      }
      bill.status = status;
      if (paymentMethod) bill.paymentMethod = paymentMethod;
      await manager.save(bill);
    });
    return this.getAsync(id);
  }
}
