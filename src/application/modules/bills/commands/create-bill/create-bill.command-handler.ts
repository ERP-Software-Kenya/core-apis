import { BadRequestException, Inject } from '@nestjs/common';
import { ICommandHandler } from '@nestjs/cqrs';
import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { CommandHandlerStrict } from '../../../../../common';
import { BILL_ITEM_REPO, BILL_REPO } from '../../../../constants';
import { Bill, BillItem } from '../../domain';
import { IBillRepo } from '../../i-bill.repo';
import { IBaseRepo, Filter, PageableFilter } from '../../../../../common';
import { EBillStatus } from '../../../../../infrastructure/persistence/entities/bill.entity';
import { CreateBillCommand } from './create-bill.command';

@CommandHandlerStrict(CreateBillCommand)
export class CreateBillCommandHandler implements ICommandHandler<CreateBillCommand, Bill> {
  constructor(
    @Inject(BILL_REPO) private readonly billRepo: IBillRepo,
    @Inject(BILL_ITEM_REPO) private readonly itemRepo: IBaseRepo<BillItem, string, PageableFilter<BillItem>, Filter<BillItem>>,
    @InjectMapper() private readonly mapper: Mapper,
    @InjectPinoLogger(CreateBillCommandHandler.name) private readonly logger: PinoLogger,
  ) {}

  public async execute(command: CreateBillCommand): Promise<Bill> {
    this.logger.info(`Executing ${CreateBillCommand.name}`);

    if (!command.customerId && !command.walkInName) {
      throw new BadRequestException('walkInName is required when customerId is not provided');
    }

    const bill        = this.mapper.map(command, CreateBillCommand, Bill);
    bill.status       = EBillStatus.INITIATED;
    bill.billNumber   = await this.generateBillNumber();
    bill.subtotal     = 0;
    bill.taxAmount    = 0;
    bill.discountAmount = 0;
    bill.totalAmount  = 0;

    const saved = await this.billRepo.createAsync(bill);

    const items: BillItem[] = (command.items ?? []).map((req) => {
      const taxRate       = Number(req.taxRate ?? 0);
      const discountAmt   = Number(req.discountAmount ?? 0);
      const taxAmount     = (Number(req.quantity) * Number(req.unitPrice) * taxRate) / 100;
      const lineTotal     = Number(req.quantity) * Number(req.unitPrice) + taxAmount - discountAmt;
      const item          = new BillItem();
      item.billId         = saved.id;
      item.productId      = req.productId;
      item.variantId      = req.variantId;
      item.quantity       = Number(req.quantity);
      item.unitPrice      = Number(req.unitPrice);
      item.taxRate        = taxRate;
      item.taxAmount      = taxAmount;
      item.discountAmount = discountAmt;
      item.lineTotal      = lineTotal;
      return item;
    });

    const savedItems: BillItem[] = [];
    for (const item of items) {
      savedItems.push(await this.itemRepo.createAsync(item));
    }

    saved.subtotal    = savedItems.reduce((s, it) => s + Number(it.quantity) * Number(it.unitPrice), 0);
    saved.taxAmount   = savedItems.reduce((s, it) => s + Number(it.taxAmount), 0);
    saved.totalAmount = saved.subtotal + saved.taxAmount - Number(saved.discountAmount);
    saved.items       = savedItems;

    return this.billRepo.updateAsync(saved);
  }

  private async generateBillNumber(): Promise<string> {
    const now      = new Date();
    const dateStr  = now.toISOString().slice(0, 10).replace(/-/g, '');
    const count    = await this.billRepo.countForDateAsync(now);
    return `BILL-${dateStr}-${String(count + 1).padStart(4, '0')}`;
  }
}
