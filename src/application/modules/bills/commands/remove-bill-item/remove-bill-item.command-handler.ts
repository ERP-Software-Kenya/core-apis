import { Inject, NotFoundException } from '@nestjs/common';
import { ICommandHandler } from '@nestjs/cqrs';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { CommandHandlerStrict } from '../../../../../common';
import { BILL_ITEM_REPO, BILL_REPO } from '../../../../constants';
import { applyBillTotals } from '../../helpers';
import { IBillItemRepo, IBillRepo } from '../..';
import { RemoveBillItemCommand } from './remove-bill-item.command';

@CommandHandlerStrict(RemoveBillItemCommand)
export class RemoveBillItemCommandHandler implements ICommandHandler<RemoveBillItemCommand, boolean> {
  constructor(
    @Inject(BILL_REPO) private readonly repo: IBillRepo,
    @Inject(BILL_ITEM_REPO) private readonly itemRepo: IBillItemRepo,
    @InjectPinoLogger(RemoveBillItemCommandHandler.name) private readonly logger: PinoLogger,
  ) {}

  public async execute(command: RemoveBillItemCommand): Promise<boolean> {
    this.logger.info(`Executing ${RemoveBillItemCommand.name}`);
    const bill = await this.repo.getAsync(command.billId);
    if (!bill) {
      throw new NotFoundException(`Bill ${command.billId} not found`);
    }

    const items = bill.items ?? [];
    if (!items.some((it) => it.id === command.itemId)) {
      throw new NotFoundException(`Item ${command.itemId} not found on bill ${command.billId}`);
    }

    await this.itemRepo.deleteAsync(command.itemId);

    bill.items = items.filter((it) => it.id !== command.itemId);
    applyBillTotals(bill);
    await this.repo.updateAsync({ ...bill, items: undefined });
    return true;
  }
}
