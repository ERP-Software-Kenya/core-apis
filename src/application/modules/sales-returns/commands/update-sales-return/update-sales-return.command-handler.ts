import { BadRequestException, Inject, NotFoundException } from '@nestjs/common';
import { ICommandHandler } from '@nestjs/cqrs';
import { InjectDataSource } from '@nestjs/typeorm';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { DataSource } from 'typeorm';
import { CommandHandlerStrict } from '../../../../../common';
import { EBillStatus, ESaleType, ESalesReturnItemCondition, ESalesReturnStatus, SalesReturnEntity, SalesReturnItemEntity } from '../../../../../infrastructure/persistence/entities';
import { BILL_REPO, SALES_RETURN_ITEM_REPO, SALES_RETURN_REPO } from '../../../../constants';
import { SalesReturn, SalesReturnItem } from '../../domain';
import { IBillRepo } from '../../../bills';
import { ISalesReturnItemRepo } from '../../i-sales-return-item.repo';
import { Bill, BillItem } from '../../../bills/domain';
import { applySalesReturnTotals, prorateLineDiscount } from '../../helpers';
import { ISalesReturnRepo } from '../../i-sales-return.repo';
import { UpdateSalesReturnCommand } from './update-sales-return.command';

@CommandHandlerStrict(UpdateSalesReturnCommand)
export class UpdateSalesReturnCommandHandler implements ICommandHandler<UpdateSalesReturnCommand, SalesReturn> {
  constructor(
    @Inject(SALES_RETURN_REPO) private readonly repo: ISalesReturnRepo,
    @Inject(SALES_RETURN_ITEM_REPO) private readonly itemRepo: ISalesReturnItemRepo,
    @Inject(BILL_REPO) private readonly billRepo: IBillRepo,
    @InjectDataSource() private readonly dataSource: DataSource,
    @InjectPinoLogger(UpdateSalesReturnCommandHandler.name) private readonly logger: PinoLogger,
  ) {}

  public async execute(command: UpdateSalesReturnCommand): Promise<SalesReturn> {
    this.logger.info(`Executing ${UpdateSalesReturnCommand.name} id=${command.id}`);
    const existing = await this.repo.getWithItemsAsync(command.id);
    if (!existing) throw new NotFoundException(`Sales return ${command.id} not found`);
    if (existing.status !== ESalesReturnStatus.Draft) throw new BadRequestException('Only draft sales returns can be updated');

    const replacementItems = command.items ? await this.buildItems(existing, command.items) : undefined;
    if (replacementItems) {
      existing.items = replacementItems;
      applySalesReturnTotals(existing);
    }

    await this.dataSource.transaction(async (manager) => {
      await manager.update(SalesReturnEntity, { id: command.id }, {
        reason: command.reason,
        notes: command.notes,
        refundMethod: command.refundMethod,
        ...(replacementItems && {
          subtotal: existing.subtotal,
          taxAmount: existing.taxAmount,
          discountAmount: existing.discountAmount,
          totalAmount: existing.totalAmount,
        }),
        updatedAt: new Date(),
      });
      if (command.items) {
        await manager.delete(SalesReturnItemEntity, { salesReturnId: command.id });
        await manager.save(
          SalesReturnItemEntity,
          replacementItems.map((item) => manager.create(SalesReturnItemEntity, { ...item, salesReturnId: command.id })),
        );
      }
    });
    return this.repo.getWithItemsAsync(command.id);
  }

  private async buildItems(existing: SalesReturn, requested: UpdateSalesReturnCommand['items']): Promise<SalesReturnItem[]> {
    if (!requested?.length) throw new BadRequestException('At least one return item is required');
    const bill = await this.billRepo.getAsync(existing.billId);
    if (!bill) throw new NotFoundException(`Bill ${existing.billId} not found`);
    if (bill.status !== EBillStatus.Completed) throw new BadRequestException('Sales returns are allowed only for completed bills');
    const billItems = new Map((bill.items ?? []).map((item) => [item.id, item]));
    const seen = new Set<string>();

    return Promise.all(requested.map(async (input) => {
      if (seen.has(input.billItemId)) throw new BadRequestException(`Duplicate return line for bill item ${input.billItemId}`);
      seen.add(input.billItemId);
      const source = billItems.get(input.billItemId);
      if (!source) throw new BadRequestException(`Bill item ${input.billItemId} is not part of bill ${bill.id}`);
      const quantity = Number(input.quantity);
      if (!Number.isFinite(quantity) || quantity <= 0) throw new BadRequestException('Return quantity must be greater than zero');
      const prior = await this.itemRepo.sumFinalizedQuantityByBillItemAsync(input.billItemId, existing.id);
      const maxReturnable = Number(source.quantity) - prior;
      if (quantity > maxReturnable) {
        throw new BadRequestException(`Cannot return ${quantity} units for bill item ${input.billItemId}. Returnable quantity is ${maxReturnable}`);
      }
      this.assertConditionAllowed(bill, input.condition);
      return this.fromBillItem(source, quantity, input.condition, input.reason);
    }));
  }

  private assertConditionAllowed(bill: Bill, condition: ESalesReturnItemCondition): void {
    if (condition === ESalesReturnItemCondition.UnpublishedRestock && bill.saleType !== ESaleType.Black) {
      throw new BadRequestException('Unpublished restock is allowed only for black sales');
    }
    if (bill.saleType === ESaleType.Black && condition === ESalesReturnItemCondition.Restock) {
      throw new BadRequestException('Black sale stock can only be damaged or returned to unpublished stock');
    }
  }

  private fromBillItem(source: BillItem, quantity: number, condition: ESalesReturnItemCondition, reason?: string): SalesReturnItem {
    const item = new SalesReturnItem();
    item.billItemId = source.id;
    item.productId = source.productId;
    item.variantId = source.variantId;
    item.quantity = quantity;
    item.unitPrice = Number(source.unitPrice);
    item.taxRate = Number(source.taxRate ?? 0);
    item.discountAmount = prorateLineDiscount(Number(source.discountAmount ?? 0), quantity, Number(source.quantity));
    item.condition = condition;
    item.reason = reason;
    return item;
  }
}
