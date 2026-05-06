import { Inject } from '@nestjs/common';
import { ICommandHandler, CommandHandler } from '@nestjs/cqrs';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { PAYMENT_TRANSACTION_REPO, IPaymentTransactionRepo } from '../..';
import { PaymentTransaction } from '../../domain';
import { UpdatePaymentTransactionCommand } from './update-payment-transaction.command';

@CommandHandler(UpdatePaymentTransactionCommand)
export class UpdatePaymentTransactionCommandHandler implements ICommandHandler<UpdatePaymentTransactionCommand, PaymentTransaction> {
  constructor(
    @Inject(PAYMENT_TRANSACTION_REPO) protected readonly repo: IPaymentTransactionRepo,
    @InjectPinoLogger(UpdatePaymentTransactionCommandHandler.name) protected readonly logger: PinoLogger,
  ) {}

  public async execute(command: UpdatePaymentTransactionCommand): Promise<PaymentTransaction> {
    this.logger.info(`Executing Command "${UpdatePaymentTransactionCommand.name}"`);
    const tx = await this.repo.getAsync(command.id);
    if (command.status) tx.status = command.status;
    return this.repo.updateAsync(tx);
  }
}
