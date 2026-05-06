import { Inject } from '@nestjs/common';
import { ICommandHandler, CommandHandler } from '@nestjs/cqrs';
import { BILL_REPO, IBillRepo } from '../..';
import { DeleteBillCommand } from './delete-bill.command';

@CommandHandler(DeleteBillCommand)
export class DeleteBillCommandHandler implements ICommandHandler<DeleteBillCommand, boolean> {
  constructor(
    @Inject(BILL_REPO) private readonly repo: IBillRepo,
  ) {}

  public async execute(command: DeleteBillCommand): Promise<boolean> {
    await this.repo.deleteAsync(command.id);
    return true;
  }
}
