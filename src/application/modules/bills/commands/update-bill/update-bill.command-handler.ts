import { Inject } from '@nestjs/common';
import { ICommandHandler, CommandHandler } from '@nestjs/cqrs';
import { BILL_REPO, IBillRepo } from '../..';
import { Bill } from '../../domain';
import { UpdateBillCommand } from './update-bill.command';

@CommandHandler(UpdateBillCommand)
export class UpdateBillCommandHandler implements ICommandHandler<UpdateBillCommand, Bill> {
  constructor(
    @Inject(BILL_REPO) private readonly repo: IBillRepo,
  ) {}

  public async execute(command: UpdateBillCommand): Promise<Bill> {
    const bill = await this.repo.getAsync(command.id);
    if (command.totalAmount !== undefined) bill.totalAmount = command.totalAmount;
    if (command.status) bill.status = command.status;
    return this.repo.updateAsync(bill);
  }
}
