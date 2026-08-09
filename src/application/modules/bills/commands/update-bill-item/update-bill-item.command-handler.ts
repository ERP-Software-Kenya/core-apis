import { Inject, NotFoundException } from '@nestjs/common';
import { ICommandHandler } from '@nestjs/cqrs';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { CommandHandlerStrict } from '../../../../../common';
import { BILL_ITEM_REPO, BILL_REPO } from '../../../../constants';
import { Bill } from '../../domain';
import { applyBillTotals, computeBillItemTotals } from '../../helpers';
import { IBillItemRepo, IBillRepo } from '../..';
import { UpdateBillItemCommand } from './update-bill-item.command';

const ITEM_FIELDS = ['productId', 'variantId', 'quantity', 'unitPrice', 'taxRate', 'discountAmount'] as const;

@CommandHandlerStrict(UpdateBillItemCommand)
export class UpdateBillItemCommandHandler implements ICommandHandler<UpdateBillItemCommand, Bill> {
  constructor(
    @Inject(BILL_REPO) private readonly repo: IBillRepo,
    @Inject(BILL_ITEM_REPO) private readonly itemRepo: IBillItemRepo,
    @InjectPinoLogger(UpdateBillItemCommandHandler.name) private readonly logger: PinoLogger,
  ) {}

  public async execute(command: UpdateBillItemCommand): Promise<Bill> {
    this.logger.info(`Executing ${UpdateBillItemCommand.name}`);
    const bill = await this.repo.getAsync(command.billId);
    if (!bill) {
      throw new NotFoundException(`Bill ${command.billId} not found`);
    }

    const item = (bill.items ?? []).find((it) => it.id === command.itemId);
    if (!item) {
      throw new NotFoundException(`Item ${command.itemId} not found on bill ${command.billId}`);
    }

    for (const field of ITEM_FIELDS) {
      if (command[field] !== undefined) {
        Object.assign(item, { [field]: command[field] });
      }
    }
    computeBillItemTotals(item);
    await this.itemRepo.updateAsync(item);

    applyBillTotals(bill);
    await this.repo.updateAsync({ ...bill, items: undefined });
    return this.repo.getAsync(bill.id);
  }
}
