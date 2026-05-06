import { Inject } from '@nestjs/common';
import { ICommandHandler, CommandHandler } from '@nestjs/cqrs';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { PAYMENT_TRANSACTION_REPO, IPaymentTransactionRepo } from '../..';
import { DeletePaymentTransactionCommand } from './delete-payment-transaction.command';

@CommandHandler(DeletePaymentTransactionCommand)
export class DeletePaymentTransactionCommandHandler implements ICommandHandler<DeletePaymentTransactionCommand, boolean> {
  constructor(
    @Inject(PAYMENT_TRANSACTION_REPO) protected readonly repo: IPaymentTransactionRepo,
    @InjectPinoLogger(DeletePaymentTransactionCommandHandler.name) protected readonly logger: PinoLogger,
  ) {}

  public async execute(command: DeletePaymentTransactionCommand): Promise<boolean> {
    this.logger.info(`Executing Command "${DeletePaymentTransactionCommand.name}"`);
    await this.repo.deleteAsync(command.id);
    return true;
  }
}
