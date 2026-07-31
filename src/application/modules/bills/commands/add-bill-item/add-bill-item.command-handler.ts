import { BadRequestException, Inject, NotFoundException } from '@nestjs/common';
import { ICommandHandler } from '@nestjs/cqrs';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { CommandHandlerStrict, IBaseRepo, Filter, PageableFilter } from '../../../../../common';
import { BILL_ITEM_REPO, BILL_REPO } from '../../../../constants';
import { Bill, BillItem } from '../../domain';
import { IBillRepo } from '../../i-bill.repo';
import { EBillStatus } from '../../../../../infrastructure/persistence/entities/bill.entity';
import { AddBillItemCommand } from './add-bill-item.command';

@CommandHandlerStrict(AddBillItemCommand)
export class AddBillItemCommandHandler implements ICommandHandler<AddBillItemCommand, Bill> {
  constructor(
    @Inject(BILL_REPO) private readonly billRepo: IBillRepo,
    @Inject(BILL_ITEM_REPO) private readonly itemRepo: IBaseRepo<BillItem, string, PageableFilter<BillItem>, Filter<BillItem>>,
    @InjectPinoLogger(AddBillItemCommandHandler.name) private readonly logger: PinoLogger,
  ) {}

  public async execute(command: AddBillItemCommand): Promise<Bill> {
    this.logger.info(`Executing ${AddBillItemCommand.name} billId=${command.billId}`);
    const bill = await this.billRepo.getAsync(command.billId);
    if (!bill) throw new NotFoundException(`Bill ${command.billId} not found`);
    if (bill.status !== EBillStatus.INITIATED) {
      throw new BadRequestException(`Cannot add items to bill in ${bill.status} status`);
    }

    const taxRate      = Number(command.taxRate ?? 0);
    const discountAmt  = Number(command.discountAmount ?? 0);
    const taxAmount    = (Number(command.quantity) * Number(command.unitPrice) * taxRate) / 100;
    const lineTotal    = Number(command.quantity) * Number(command.unitPrice) + taxAmount - discountAmt;

    const item          = new BillItem();
    item.billId         = command.billId;
    item.productId      = command.productId;
    item.variantId      = command.variantId;
    item.quantity       = Number(command.quantity);
    item.unitPrice      = Number(command.unitPrice);
    item.taxRate        = taxRate;
    item.taxAmount      = taxAmount;
    item.discountAmount = discountAmt;
    item.lineTotal      = lineTotal;
    await this.itemRepo.createAsync(item);

    return this.recalcAndSave(bill);
  }

  private async recalcAndSave(bill: Bill): Promise<Bill> {
    const items   = await this.itemRepo.allAsync({ billId: bill.id } as Filter<BillItem>);
    bill.subtotal    = items.reduce((s, it) => s + Number(it.quantity) * Number(it.unitPrice), 0);
    bill.taxAmount   = items.reduce((s, it) => s + Number(it.taxAmount), 0);
    bill.totalAmount = bill.subtotal + bill.taxAmount - Number(bill.discountAmount);
    return this.billRepo.updateAsync(bill);
  }
}
