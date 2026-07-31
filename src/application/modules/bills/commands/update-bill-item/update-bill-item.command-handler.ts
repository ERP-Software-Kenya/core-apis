import { BadRequestException, Inject, NotFoundException } from '@nestjs/common';
import { ICommandHandler } from '@nestjs/cqrs';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { CommandHandlerStrict, IBaseRepo, Filter, PageableFilter } from '../../../../../common';
import { BILL_ITEM_REPO, BILL_REPO } from '../../../../constants';
import { Bill, BillItem } from '../../domain';
import { IBillRepo } from '../../i-bill.repo';
import { EBillStatus } from '../../../../../infrastructure/persistence/entities/bill.entity';
import { UpdateBillItemCommand } from './update-bill-item.command';

@CommandHandlerStrict(UpdateBillItemCommand)
export class UpdateBillItemCommandHandler implements ICommandHandler<UpdateBillItemCommand, Bill> {
  constructor(
    @Inject(BILL_REPO) private readonly billRepo: IBillRepo,
    @Inject(BILL_ITEM_REPO) private readonly itemRepo: IBaseRepo<BillItem, string, PageableFilter<BillItem>, Filter<BillItem>>,
    @InjectPinoLogger(UpdateBillItemCommandHandler.name) private readonly logger: PinoLogger,
  ) {}

  public async execute(command: UpdateBillItemCommand): Promise<Bill> {
    this.logger.info(`Executing ${UpdateBillItemCommand.name} itemId=${command.itemId}`);
    const bill = await this.billRepo.getAsync(command.billId);
    if (!bill) throw new NotFoundException(`Bill ${command.billId} not found`);
    if (bill.status !== EBillStatus.INITIATED) {
      throw new BadRequestException(`Cannot update items on bill in ${bill.status} status`);
    }
    const item = await this.itemRepo.getAsync(command.itemId);
    if (!item) throw new NotFoundException(`Bill item ${command.itemId} not found`);

    if (command.quantity       !== undefined) item.quantity       = Number(command.quantity);
    if (command.unitPrice      !== undefined) item.unitPrice      = Number(command.unitPrice);
    if (command.taxRate        !== undefined) item.taxRate        = Number(command.taxRate);
    if (command.discountAmount !== undefined) item.discountAmount = Number(command.discountAmount);

    item.taxAmount = (item.quantity * item.unitPrice * item.taxRate) / 100;
    item.lineTotal = item.quantity * item.unitPrice + item.taxAmount - item.discountAmount;
    await this.itemRepo.updateAsync(item);

    const allItems   = await this.itemRepo.allAsync({ billId: command.billId } as Filter<BillItem>);
    bill.subtotal    = allItems.reduce((s, it) => s + Number(it.quantity) * Number(it.unitPrice), 0);
    bill.taxAmount   = allItems.reduce((s, it) => s + Number(it.taxAmount), 0);
    bill.totalAmount = bill.subtotal + bill.taxAmount - Number(bill.discountAmount);
    return this.billRepo.updateAsync(bill);
  }
}
