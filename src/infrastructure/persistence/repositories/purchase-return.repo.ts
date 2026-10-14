import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { EntityManager, FindManyOptions, Repository } from 'typeorm';
import { BaseRepo, DbException, Filter, PageableFilter } from '../../../common';
import { applyPurchaseReturnBranchScope, IPurchaseReturnRepo, PurchaseReturn, PurchaseReturnFilter, PurchaseReturnRefundResult, RecordPurchaseReturnRefundInput, UpdatePurchaseReturnRecord } from '../../../application/modules/purchase-returns';
import {
  EMovementType,
  EPurchaseReturnItemSourceType,
  EPurchaseReturnStatus,
  InventoryEntity,
  PurchaseItemAllocationEntity,
  PurchaseItemEntity,
  PurchaseOrderEntity,
  PurchaseReturnEntity,
  PurchaseReturnItemEntity,
  PurchaseReturnRefundEntity,
  StockMovementEntity,
} from '../entities';
import {
  calculatePurchaseReturnSettlement,
  calculateSupplierCreditOutstanding,
  OFFICIAL_ACCOUNT_CODES,
} from '../../../application/modules/accounting';
import { postOfficialJournal } from './ledger-posting';
import { roundReturnMoney } from '../../../application/shared/helpers';

@Injectable()
export class PurchaseReturnRepo
  extends BaseRepo<PurchaseReturnEntity, PurchaseReturn, string, PageableFilter<PurchaseReturnFilter>, Filter<PurchaseReturnFilter>>
  implements IPurchaseReturnRepo
{
  constructor(
    @InjectRepository(PurchaseReturnEntity) internalRepo: Repository<PurchaseReturnEntity>,
    @InjectMapper() mapper: Mapper,
    @InjectPinoLogger(PurchaseReturnRepo.name) logger: PinoLogger,
  ) {
    super(internalRepo, mapper, logger, PurchaseReturnEntity, PurchaseReturn);
  }

  public override get idColumnName(): keyof PurchaseReturnEntity {
    return 'id';
  }

  public override get specialFilterFields(): (keyof PageableFilter<PurchaseReturnFilter>)[] {
    return [...super.specialFilterFields, 'branchId'];
  }

  protected override modifyFindOption(
    findOpts: FindManyOptions<PurchaseReturnEntity>,
    filterObj: Filter<PurchaseReturnFilter> | PageableFilter<PurchaseReturnFilter>,
  ): void {
    const branchId = filterObj?.branchId;
    if (!branchId) return;
    findOpts.where = applyPurchaseReturnBranchScope(findOpts.where as object, branchId);
  }

  public async getWithItemsAsync(id: string): Promise<PurchaseReturn | null> {
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

  public override async getAsync(id: string): Promise<PurchaseReturn> {
    return this.getWithItemsAsync(id);
  }

  public async finalizeAsync(id: string, performedById: string): Promise<PurchaseReturn> {
    await this.internalRepo.manager.transaction(async (manager) => {
      const ret = await manager.findOne(PurchaseReturnEntity, {
        where: { id },
        relations: { items: true },
        lock: { mode: 'pessimistic_write' },
      });
      if (!ret) throw new NotFoundException(`Purchase return ${id} not found`);
      if (ret.status === EPurchaseReturnStatus.Finalized) return;
      if (ret.status === EPurchaseReturnStatus.Cancelled) {
        throw new BadRequestException('Cancelled purchase returns cannot be finalized');
      }
      if (!ret.items?.length) throw new BadRequestException('At least one return item is required');

      const purchaseOrder = await manager.findOne(PurchaseOrderEntity, {
        where: {
          id: ret.purchaseOrderId,
          organizationId: ret.organizationId,
          supplierId: ret.supplierId,
        },
        lock: { mode: 'pessimistic_write' },
      });
      if (!purchaseOrder) throw new NotFoundException(`Purchase order ${ret.purchaseOrderId} not found`);

      let allocatedReturnValue = 0;
      const allocatedReturnByLocation = new Map<string, number>();
      let totalReturnValue = 0;

      for (const item of [...ret.items].sort((a, b) => a.purchaseItemId.localeCompare(b.purchaseItemId))) {
        const source = await manager.findOne(PurchaseItemEntity, {
          where: { id: item.purchaseItemId, purchaseOrderId: ret.purchaseOrderId },
          lock: { mode: 'pessimistic_write' },
        });
        if (!source) throw new NotFoundException(`Purchase item ${item.purchaseItemId} not found`);
        if (item.productId !== source.productId) {
          throw new BadRequestException(`Return item ${item.id} does not match its source purchase item`);
        }
        const quantity = Number(item.quantity);
        if (!Number.isFinite(quantity) || quantity <= 0) {
          throw new BadRequestException('Return quantity must be greater than zero');
        }
        item.unitCost = Number(source.unitCost);
        item.lineTotal = roundReturnMoney(quantity * item.unitCost);
        await manager.save(item);
        totalReturnValue += item.lineTotal;

        if (item.sourceType === EPurchaseReturnItemSourceType.UnallocatedReceived) {
          if (item.locationId) {
            throw new BadRequestException('Location is not allowed for unallocated received returns');
          }
          const returnable = Number(source.quantityReceived ?? 0) - Number(source.quantityAllocated ?? 0);
          if (Number(item.quantity) > returnable) {
            throw new BadRequestException(`Returnable unallocated quantity is ${returnable}`);
          }
          source.quantityReceived = Number(source.quantityReceived ?? 0) - Number(item.quantity);
          await manager.save(source);
          continue;
        }

        if (!item.locationId) throw new BadRequestException('Location is required for allocated stock returns');
        const allocation = await manager
          .getRepository(PurchaseItemAllocationEntity)
          .createQueryBuilder('allocation')
          .select('COALESCE(SUM(allocation.quantity), 0)', 'quantity')
          .where('allocation.purchaseItemId = :purchaseItemId', { purchaseItemId: item.purchaseItemId })
          .andWhere('allocation.locationId = :locationId', { locationId: item.locationId })
          .getRawOne<{ quantity: string }>();
        const returned = await manager
          .getRepository(PurchaseReturnItemEntity)
          .createQueryBuilder('item')
          .innerJoin(PurchaseReturnEntity, 'return', 'return.id = item.purchaseReturnId')
          .select('COALESCE(SUM(item.quantity), 0)', 'quantity')
          .where('item.purchaseItemId = :purchaseItemId', { purchaseItemId: item.purchaseItemId })
          .andWhere('item.locationId = :locationId', { locationId: item.locationId })
          .andWhere('item.sourceType = :sourceType', { sourceType: EPurchaseReturnItemSourceType.AllocatedStock })
          .andWhere('return.status = :status', { status: EPurchaseReturnStatus.Finalized })
          .andWhere('return.id <> :returnId', { returnId: ret.id })
          .getRawOne<{ quantity: string }>();
        const returnable = Number(allocation?.quantity ?? 0) - Number(returned?.quantity ?? 0);
        if (Number(item.quantity) > returnable) {
          throw new BadRequestException(`Returnable allocated quantity at this location is ${returnable}`);
        }

        const stock = await manager.findOne(InventoryEntity, {
          where: {
            organizationId: ret.organizationId,
            locationId: item.locationId,
            productId: item.productId,
          },
          lock: { mode: 'pessimistic_write' },
        });
        if (!stock) throw new BadRequestException(`No inventory found for product ${item.productId}`);
        const before = Number(stock.quantityOnHand);
        const available = before - Number(stock.quantityReserved);
        if (Number(item.quantity) > available) {
          throw new BadRequestException(`Insufficient available stock. Available: ${available}`);
        }
        stock.quantityOnHand = before - Number(item.quantity);
        await manager.save(stock);
        await manager.save(StockMovementEntity, manager.create(StockMovementEntity, {
          inventoryId: stock.id,
          locationId: item.locationId,
          productId: item.productId,
          performedById,
          referenceId: ret.id,
          referenceType: 'purchase_return',
          movementType: EMovementType.StockOut,
          quantity: item.quantity,
          quantityBefore: before,
          quantityAfter: stock.quantityOnHand,
          unitCost: item.unitCost,
          notes: `Purchase return ${ret.returnNumber}`,
        }));
        allocatedReturnValue += Number(item.lineTotal);
        allocatedReturnByLocation.set(
          item.locationId,
          Number(allocatedReturnByLocation.get(item.locationId) ?? 0) + Number(item.lineTotal),
        );
      }

      ret.totalAmount = roundReturnMoney(totalReturnValue);

      if (allocatedReturnValue > 0) {
        ret.supplierCreditAmount = await this.postReturnJournal(
          manager,
          ret,
          purchaseOrder,
          allocatedReturnValue,
          allocatedReturnByLocation,
          performedById,
        );
      }
      ret.refundedAmount = 0;

      ret.status = EPurchaseReturnStatus.Finalized;
      ret.finalizedById = performedById;
      ret.finalizedAt = new Date();
      await manager.save(ret);
    });
    return this.getWithItemsAsync(id);
  }

  public async updateDraftAsync(input: UpdatePurchaseReturnRecord): Promise<PurchaseReturn> {
    await this.internalRepo.manager.transaction(async (manager) => {
      const ret = await manager.findOne(PurchaseReturnEntity, {
        where: { id: input.id },
        lock: { mode: 'pessimistic_write' },
      });
      if (!ret) throw new NotFoundException(`Purchase return ${input.id} not found`);
      if (ret.status !== EPurchaseReturnStatus.Draft) {
        throw new BadRequestException('Only draft purchase returns can be updated');
      }
      if (input.reason !== undefined) ret.reason = input.reason;
      if (input.notes !== undefined) ret.notes = input.notes;
      if (input.items) {
        ret.totalAmount = Number(input.totalAmount);
        await manager.delete(PurchaseReturnItemEntity, { purchaseReturnId: ret.id });
        await manager.save(PurchaseReturnItemEntity, input.items.map((item) =>
          manager.create(PurchaseReturnItemEntity, { ...item, id: undefined, purchaseReturnId: ret.id }),
        ));
      }
      await manager.save(ret);
    });
    return this.getWithItemsAsync(input.id);
  }

  public async recordRefundAsync(input: RecordPurchaseReturnRefundInput): Promise<PurchaseReturnRefundResult> {
    const amount = Number(input.amount);
    if (!Number.isFinite(amount) || amount <= 0) throw new BadRequestException('Refund amount must be positive');
    const paymentMethod = input.paymentMethod.toUpperCase();
    if (!['CASH', 'CARD', 'UPI', 'NET_BANKING', 'CHEQUE'].includes(paymentMethod)) throw new BadRequestException('Unsupported refund method');
    return this.internalRepo.manager.transaction(async (manager) => {
      const ret = await manager.findOne(PurchaseReturnEntity, {
        where: { id: input.id, organizationId: input.organizationId }, lock: { mode: 'pessimistic_write' },
      });
      if (!ret) throw new NotFoundException(`Purchase return ${input.id} not found`);
      if (ret.status !== EPurchaseReturnStatus.Finalized) throw new BadRequestException('Only finalized purchase returns can receive refunds');
      const purchaseOrder = await manager.findOne(PurchaseOrderEntity, { where: { id: ret.purchaseOrderId, organizationId: input.organizationId } });
      if (!purchaseOrder) throw new NotFoundException(`Purchase order ${ret.purchaseOrderId} not found`);
      const outstandingCredit = calculateSupplierCreditOutstanding(Number(ret.supplierCreditAmount ?? 0), Number(ret.refundedAmount ?? 0));
      if (amount > outstandingCredit) throw new BadRequestException(`Refund exceeds outstanding supplier credit ${outstandingCredit}`);
      const refund = await manager.save(PurchaseReturnRefundEntity, manager.create(PurchaseReturnRefundEntity, {
        organizationId: input.organizationId, purchaseReturnId: ret.id, supplierId: ret.supplierId,
        amount, paymentMethod, receivedAt: input.receivedAt, note: input.note, performedById: input.performedById,
      }));
      const receiptAccount = paymentMethod === 'CASH' ? OFFICIAL_ACCOUNT_CODES.Cash : OFFICIAL_ACCOUNT_CODES.Bank;
      await postOfficialJournal(manager, {
        organizationId: input.organizationId, idempotencyKey: `purchase-return-refund:${refund.id}`,
        sourceType: 'purchase_return_refund', sourceId: refund.id, occurredAt: input.receivedAt,
        description: `Supplier refund for ${ret.returnNumber}`, createdBy: input.performedById,
        lines: [
          { accountCode: receiptAccount, debit: amount, credit: 0, supplierId: ret.supplierId, branchId: purchaseOrder.branchId },
          { accountCode: OFFICIAL_ACCOUNT_CODES.SupplierAdvances, debit: 0, credit: amount, supplierId: ret.supplierId, branchId: purchaseOrder.branchId },
        ],
      });
      ret.refundedAmount = roundReturnMoney(Number(ret.refundedAmount ?? 0) + amount);
      await manager.save(ret);
      return { id: refund.id, amount, refundedAmount: ret.refundedAmount, outstandingCredit: roundReturnMoney(outstandingCredit - amount) };
    });
  }

  private async postReturnJournal(
    manager: EntityManager,
    ret: PurchaseReturnEntity,
    purchaseOrder: PurchaseOrderEntity,
    returnValue: number,
    returnValueByLocation: Map<string, number>,
    performedById: string,
  ): Promise<number> {
    const priorReturn = await manager
      .getRepository(PurchaseReturnItemEntity)
      .createQueryBuilder('item')
      .innerJoin(PurchaseReturnEntity, 'return', 'return.id = item.purchaseReturnId')
      .select('COALESCE(SUM(item.lineTotal), 0)', 'value')
      .where('return.purchaseOrderId = :purchaseOrderId', { purchaseOrderId: purchaseOrder.id })
      .andWhere('return.status = :status', { status: EPurchaseReturnStatus.Finalized })
      .andWhere('return.id <> :returnId', { returnId: ret.id })
      .andWhere('item.sourceType = :sourceType', { sourceType: EPurchaseReturnItemSourceType.AllocatedStock })
      .getRawOne<{ value: string }>();
    const allocated = await manager
      .getRepository(PurchaseItemEntity)
      .createQueryBuilder('item')
      .select('COALESCE(SUM(item.quantityAllocated * item.unitCost), 0)', 'value')
      .where('item.purchaseOrderId = :purchaseOrderId', { purchaseOrderId: purchaseOrder.id })
      .getRawOne<{ value: string }>();
    const amount = (value: number) => Number(value.toFixed(4));
    const total = amount(returnValue);
    const { payableReduction, supplierCredit } = calculatePurchaseReturnSettlement(
      Number(allocated?.value ?? 0),
      Number(priorReturn?.value ?? 0),
      Number(purchaseOrder.amountPaid ?? 0),
      total,
    );

    await postOfficialJournal(manager, {
      organizationId: ret.organizationId,
      idempotencyKey: `purchase-return:${ret.id}:finalization`,
      sourceType: 'purchase_return',
      sourceId: ret.id,
      occurredAt: new Date(),
      description: `Purchase return ${ret.returnNumber}`,
      createdBy: performedById,
      lines: [
        ...(payableReduction > 0 ? [{
          accountCode: OFFICIAL_ACCOUNT_CODES.AccountsPayable,
          debit: payableReduction,
          credit: 0,
          supplierId: ret.supplierId,
          branchId: purchaseOrder.branchId,
        }] : []),
        ...(supplierCredit > 0 ? [{
          accountCode: OFFICIAL_ACCOUNT_CODES.SupplierAdvances,
          debit: supplierCredit,
          credit: 0,
          supplierId: ret.supplierId,
          branchId: purchaseOrder.branchId,
        }] : []),
        ...[...returnValueByLocation.entries()].map(([locationId, value]) => ({
          accountCode: OFFICIAL_ACCOUNT_CODES.Inventory,
          debit: 0,
          credit: amount(value),
          supplierId: ret.supplierId,
          branchId: purchaseOrder.branchId,
          locationId,
        })),
      ],
    });
    return supplierCredit;
  }
}
