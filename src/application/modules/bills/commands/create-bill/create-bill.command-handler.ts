import { Inject } from '@nestjs/common';
import { ICommandHandler, CommandHandler } from '@nestjs/cqrs';
import { BILL_REPO, IBillRepo } from '../..';
import { Bill } from '../../domain';
import { CreateBillCommand } from './create-bill.command';

@CommandHandler(CreateBillCommand)
export class CreateBillCommandHandler implements ICommandHandler<CreateBillCommand, Bill> {
  constructor(
    @Inject(BILL_REPO) private readonly repo: IBillRepo,
  ) {}

  public async execute(command: CreateBillCommand): Promise<Bill> {
    const bill = new Bill();
    bill.supplierId = command.supplierId;
    bill.storeId = command.storeId;
    bill.totalAmount = command.totalAmount;
    bill.status = command.status || 'PENDING';
    return this.repo.createAsync(bill);
  }
}
