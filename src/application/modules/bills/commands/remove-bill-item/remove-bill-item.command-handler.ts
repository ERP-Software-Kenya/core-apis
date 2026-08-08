import { BadRequestException, Inject, NotFoundException } from '@nestjs/common';
import { ICommandHandler } from '@nestjs/cqrs';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { CommandHandlerStrict, IBaseRepo, Filter, PageableFilter } from '../../../../../common';
import { BILL_ITEM_REPO, BILL_REPO } from '../../../../constants';
import { Bill, BillItem } from '../../domain';
import { IBillRepo } from '../../i-bill.repo';
import { EBillStatus } from '../../../../../infrastructure/persistence/entities/bill.entity';
import { RemoveBillItemCommand } from './remove-bill-item.command';

@CommandHandlerStrict(RemoveBillItemCommand)
export class RemoveBillItemCommandHandler implements ICommandHandler<RemoveBillItemCommand, Bill> {
  constructor(
    @Inject(BILL_REPO) private readonly billRepo: IBillRepo,
    @Inject(BILL_ITEM_REPO) private readonly itemRepo: IBaseRepo<BillItem, string, PageableFilter<BillItem>, Filter<BillItem>>,
    @InjectPinoLogger(RemoveBillItemCommandHandler.name) private readonly logger: PinoLogger,
  ) {}

  public async execute(command: RemoveBillItemCommand): Promise<Bill> {
    this.logger.info(`Executing ${RemoveBillItemCommand.name} itemId=${command.itemId}`);
    const bill = await this.billRepo.getAsync(command.billId);
    if (!bill) throw new NotFoundException(`Bill ${command.billId} not found`);
    if (bill.status !== EBillStatus.INITIATED) {
      throw new BadRequestException(`Cannot remove items from bill in ${bill.status} status`);
    }
    const item = await this.itemRepo.getAsync(command.itemId);
    if (!item) throw new NotFoundException(`Bill item ${command.itemId} not found`);
    await this.itemRepo.deleteAsync(command.itemId, true);

    const remaining  = await this.itemRepo.allAsync({ billId: command.billId } as Filter<BillItem>);
    bill.subtotal    = remaining.reduce((s, it) => s + Number(it.quantity) * Number(it.unitPrice), 0);
    bill.taxAmount   = remaining.reduce((s, it) => s + Number(it.taxAmount), 0);
    bill.totalAmount = bill.subtotal + bill.taxAmount - Number(bill.discountAmount);
    return this.billRepo.updateAsync(bill);
  }
}
