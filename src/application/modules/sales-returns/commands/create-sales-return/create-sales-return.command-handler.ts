import { BadRequestException, Inject, NotFoundException } from '@nestjs/common';
import { ICommandHandler } from '@nestjs/cqrs';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { CommandHandlerStrict } from '../../../../../common';
import { BILL_REPO, SALES_RETURN_ITEM_REPO, SALES_RETURN_REPO } from '../../../../constants';
import { generateReturnNumber } from '../../../../shared/helpers/return-number';
import { EBillStatus, ESaleType, ESalesReturnItemCondition, ESalesReturnRefundStatus, ESalesReturnStatus } from '../../../../../infrastructure/persistence/entities';
import { IBillRepo } from '../../../bills';
import { Bill, BillItem } from '../../../bills/domain';
import { SalesReturn, SalesReturnItem } from '../../domain';
import { ISalesReturnItemRepo, ISalesReturnRepo } from '../../index';
import { applySalesReturnTotals, prorateLineDiscount } from '../../helpers';
import { CreateSalesReturnCommand } from './create-sales-return.command';

@CommandHandlerStrict(CreateSalesReturnCommand)
export class CreateSalesReturnCommandHandler implements ICommandHandler<CreateSalesReturnCommand, SalesReturn> {
  constructor(
    @Inject(BILL_REPO) private readonly billRepo: IBillRepo,
    @Inject(SALES_RETURN_REPO) private readonly returnRepo: ISalesReturnRepo,
    @Inject(SALES_RETURN_ITEM_REPO) private readonly itemRepo: ISalesReturnItemRepo,
    @InjectPinoLogger(CreateSalesReturnCommandHandler.name) private readonly logger: PinoLogger,
  ) {}

  public async execute(command: CreateSalesReturnCommand): Promise<SalesReturn> {
    this.logger.info(`Executing ${CreateSalesReturnCommand.name} billId=${command.billId}`);
    const bill = await this.loadCompletedBill(command.billId, command.organizationId);
    const items = await this.buildItems(bill, command.items ?? []);

    const ret = new SalesReturn();
    ret.returnNumber  = generateReturnNumber('SR');
    ret.organizationId = bill.organizationId;
    ret.locationId     = bill.locationId;
    ret.billId         = bill.id;
    ret.customerId     = bill.customerId;
    ret.saleType       = bill.saleType;
    ret.status         = ESalesReturnStatus.Draft;
    ret.refundMethod   = command.refundMethod;
    ret.refundStatus   = ESalesReturnRefundStatus.None;
    ret.reason         = command.reason;
    ret.notes          = command.notes;
    ret.createdById    = command.createdById;
    ret.items          = items;
    applySalesReturnTotals(ret);
    return this.returnRepo.createAsync(ret);
  }

  private async loadCompletedBill(billId: string, organizationId: string): Promise<Bill> {
    const bill = await this.billRepo.getAsync(billId);
    if (!bill) throw new NotFoundException(`Bill ${billId} not found`);
    if (bill.organizationId !== organizationId) throw new BadRequestException('Bill does not belong to the current organization');
    if (bill.status !== EBillStatus.Completed) throw new BadRequestException('Sales returns are allowed only for completed bills');
    return bill;
  }

  private async buildItems(bill: Bill, requested: CreateSalesReturnCommand['items']): Promise<SalesReturnItem[]> {
    if (!requested?.length) throw new BadRequestException('At least one return item is required');
    const billItems = new Map((bill.items ?? []).map((item) => [item.id, item]));
    const seen = new Set<string>();
    const prior = await this.itemRepo.sumFinalizedQuantitiesByBillItemsAsync(requested.map((item) => item.billItemId));

    return requested.map((input) => {
      if (seen.has(input.billItemId)) throw new BadRequestException(`Duplicate return line for bill item ${input.billItemId}`);
      seen.add(input.billItemId);
      const source = billItems.get(input.billItemId);
      if (!source) throw new BadRequestException(`Bill item ${input.billItemId} is not part of bill ${bill.id}`);
      const quantity = Number(input.quantity);
      if (!Number.isFinite(quantity) || quantity <= 0) throw new BadRequestException('Return quantity must be greater than zero');
      const alreadyReturned = prior.get(input.billItemId) ?? 0;
      const maxReturnable = Number(source.quantity) - alreadyReturned;
      if (quantity > maxReturnable) {
        throw new BadRequestException(`Cannot return ${quantity} units for bill item ${input.billItemId}. Returnable quantity is ${maxReturnable}`);
      }
      this.assertConditionAllowed(bill, input.condition);
      return this.fromBillItem(source, quantity, input.condition, input.reason);
    });
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
    item.billItemId      = source.id;
    item.productId       = source.productId;
    item.variantId       = source.variantId;
    item.quantity        = quantity;
    item.unitPrice       = Number(source.unitPrice);
    item.taxRate         = Number(source.taxRate ?? 0);
    item.discountAmount  = prorateLineDiscount(Number(source.discountAmount ?? 0), quantity, Number(source.quantity));
    item.condition       = condition;
    item.reason          = reason;
    return item;
  }
}
