import { BadRequestException, Inject, NotFoundException } from '@nestjs/common';
import { ICommandHandler } from '@nestjs/cqrs';
import { InjectDataSource } from '@nestjs/typeorm';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { DataSource, EntityManager } from 'typeorm';
import { CommandHandlerStrict } from '../../../../../common';
import {
  BillEntity,
  CustomerCreditTransactionEntity,
  CustomerEntity,
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
  UnpublishedStockMovementEntity,
} from '../../../../../infrastructure/persistence/entities';
import { INVENTORY_REPO, SALES_RETURN_ITEM_REPO, SALES_RETURN_REPO, UNPUBLISHED_STOCK_REPO } from '../../../../constants';
import { IInventoryRepo } from '../../../inventory';
import { IUnpublishedStockRepo } from '../../../unpublished-stock';
import { ISalesReturnItemRepo, ISalesReturnRepo } from '../../index';
import { SalesReturn } from '../../domain';
import { FinalizeSalesReturnCommand } from './finalize-sales-return.command';

@CommandHandlerStrict(FinalizeSalesReturnCommand)
export class FinalizeSalesReturnCommandHandler implements ICommandHandler<FinalizeSalesReturnCommand, SalesReturn> {
  constructor(
    @Inject(SALES_RETURN_REPO) private readonly repo: ISalesReturnRepo,
    @Inject(SALES_RETURN_ITEM_REPO) private readonly itemRepo: ISalesReturnItemRepo,
    @Inject(INVENTORY_REPO) private readonly inventoryRepo: IInventoryRepo,
    @Inject(UNPUBLISHED_STOCK_REPO) private readonly unpublishedRepo: IUnpublishedStockRepo,
    @InjectDataSource() private readonly dataSource: DataSource,
    @InjectPinoLogger(FinalizeSalesReturnCommandHandler.name) private readonly logger: PinoLogger,
  ) {}

  public async execute(command: FinalizeSalesReturnCommand): Promise<SalesReturn> {
    this.logger.info(`Executing ${FinalizeSalesReturnCommand.name} id=${command.id}`);
    await this.dataSource.transaction(async (manager) => {
      const ret = await manager.findOne(SalesReturnEntity, {
        where: { id: command.id },
        relations: { items: true },
        lock: { mode: 'pessimistic_write' },
      });
      if (!ret) throw new NotFoundException(`Sales return ${command.id} not found`);
      if (ret.status === ESalesReturnStatus.Finalized) return;
      if (ret.status === ESalesReturnStatus.Cancelled) throw new BadRequestException('Cancelled sales returns cannot be finalized');

      const bill = await manager.findOne(BillEntity, { where: { id: ret.billId }, relations: { items: true } });
      if (!bill) throw new NotFoundException(`Bill ${ret.billId} not found`);
      if (bill.status !== EBillStatus.Completed) throw new BadRequestException('Sales returns are allowed only for completed bills');

      if (!ret.items?.length) throw new BadRequestException('At least one return item is required');
      await this.validateQuantities(ret, bill);
      for (const item of ret.items ?? []) {
        if (item.condition === ESalesReturnItemCondition.Restock) {
          await this.postOfficialRestock(ret, item, command.performedById, manager);
        } else if (item.condition === ESalesReturnItemCondition.UnpublishedRestock) {
          await this.postUnpublishedRestock(ret, item, command.performedById, manager);
        } else {
          await this.postDamageRecord(ret, item, command.performedById, manager);
        }
      }

      if (bill.saleType === ESaleType.Credit && bill.customerId) {
        await this.postCreditReversal(ret, bill.customerId, command.performedById, manager);
      }
      if (ret.refundMethod && bill.saleType === ESaleType.Normal) {
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
      }

      ret.status = ESalesReturnStatus.Finalized;
      ret.finalizedById = command.performedById;
      ret.finalizedAt = new Date();
      await manager.save(SalesReturnEntity, ret);
    });
    return this.repo.getWithItemsAsync(command.id);
  }

  private async validateQuantities(ret: SalesReturnEntity, bill: BillEntity): Promise<void> {
    const billItems = new Map((bill.items ?? []).map((item) => [item.id, item]));
    for (const item of ret.items ?? []) {
      const source = billItems.get(item.billItemId);
      if (!source) throw new BadRequestException(`Bill item ${item.billItemId} is no longer available`);
      const prior = await this.itemRepo.sumFinalizedQuantityByBillItemAsync(item.billItemId, ret.id);
      const maxReturnable = Number(source.quantity) - prior;
      if (Number(item.quantity) > maxReturnable) {
        throw new BadRequestException(`Cannot finalize return for bill item ${item.billItemId}. Returnable quantity is ${maxReturnable}`);
      }
      if (item.condition === ESalesReturnItemCondition.UnpublishedRestock && bill.saleType !== ESaleType.Black) {
        throw new BadRequestException('Unpublished restock is allowed only for black sales');
      }
      if (bill.saleType === ESaleType.Black && item.condition === ESalesReturnItemCondition.Restock) {
        throw new BadRequestException('Black sale stock can only be damaged or returned to unpublished stock');
      }
    }
  }

  private async postOfficialRestock(ret: SalesReturnEntity, item: SalesReturnItemEntity, performedById: string, manager: EntityManager): Promise<void> {
    let inv = await this.inventoryRepo.findByOrgLocationProductAsync(ret.organizationId, ret.locationId, item.productId, manager);
    if (!inv) {
      const entity = await manager.save(InventoryEntity, manager.create(InventoryEntity, {
        organizationId: ret.organizationId,
        locationId: ret.locationId,
        productId: item.productId,
        quantityOnHand: 0,
        quantityReserved: 0,
        reorderLevel: 0,
      }));
      inv = { ...entity } as never;
    }
    const before = Number(inv.quantityOnHand);
    const updated = await this.inventoryRepo.addStockAsync(inv.id, Number(item.quantity), undefined, manager);
    await manager.save(StockMovementEntity, manager.create(StockMovementEntity, {
      inventoryId: inv.id,
      locationId: ret.locationId,
      productId: item.productId,
      performedById,
      referenceId: ret.id,
      referenceType: 'sales_return',
      movementType: EMovementType.Return,
      quantity: item.quantity,
      quantityBefore: before,
      quantityAfter: Number(updated.quantityOnHand),
      notes: `Sales return ${ret.returnNumber}`,
    }));
  }

  private async postDamageRecord(ret: SalesReturnEntity, item: SalesReturnItemEntity, performedById: string, manager: EntityManager): Promise<void> {
    let inv = await this.inventoryRepo.findByOrgLocationProductAsync(ret.organizationId, ret.locationId, item.productId, manager);
    if (!inv) {
      const entity = await manager.save(InventoryEntity, manager.create(InventoryEntity, {
        organizationId: ret.organizationId,
        locationId: ret.locationId,
        productId: item.productId,
        quantityOnHand: 0,
        quantityReserved: 0,
        reorderLevel: 0,
      }));
      inv = { ...entity } as never;
    }
    const before = Number(inv.quantityOnHand ?? 0);
    await manager.save(StockMovementEntity, manager.create(StockMovementEntity, {
      inventoryId: inv.id,
      locationId: ret.locationId,
      productId: item.productId,
      performedById,
      referenceId: ret.id,
      referenceType: 'sales_return',
      movementType: EMovementType.Damage,
      quantity: item.quantity,
      quantityBefore: before,
      quantityAfter: before,
      notes: `Damaged sales return ${ret.returnNumber}`,
    }));
  }

  private async postUnpublishedRestock(ret: SalesReturnEntity, item: SalesReturnItemEntity, performedById: string, manager: EntityManager): Promise<void> {
    const rec = await this.unpublishedRepo.findOrCreateAsync(ret.organizationId, ret.locationId, item.productId, manager);
    const before = Number(rec.quantityOnHand);
    const updated = await this.unpublishedRepo.addStockAsync(rec.id, Number(item.quantity), undefined, manager);
    await manager.save(UnpublishedStockMovementEntity, manager.create(UnpublishedStockMovementEntity, {
      unpublishedStockId: rec.id,
      locationId: ret.locationId,
      productId: item.productId,
      performedById,
      movementType: EUnpublishedMovementType.StockIn,
      quantity: item.quantity,
      quantityBefore: before,
      quantityAfter: Number(updated.quantityOnHand),
      notes: `Sales return ${ret.returnNumber}`,
    }));
  }

  private async postCreditReversal(ret: SalesReturnEntity, customerId: string, performedById: string, manager: EntityManager): Promise<void> {
    const customer = await manager.findOne(CustomerEntity, { where: { id: customerId } });
    if (!customer) throw new NotFoundException(`Customer ${customerId} not found`);
    const before = Number(customer.creditBalance ?? 0);
    const after = before - Number(ret.totalAmount);
    customer.creditBalance = after;
    await manager.save(CustomerEntity, customer);
    await manager.save(CustomerCreditTransactionEntity, manager.create(CustomerCreditTransactionEntity, {
      customerId,
      billId: ret.billId,
      type: ECreditTransactionType.SalesReturn,
      amount: ret.totalAmount,
      balanceBefore: before,
      balanceAfter: after,
      performedById,
      note: `Sales return ${ret.returnNumber}`,
    }));
  }
}
