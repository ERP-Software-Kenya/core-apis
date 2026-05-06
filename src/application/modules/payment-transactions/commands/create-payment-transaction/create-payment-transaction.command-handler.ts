import { Inject } from '@nestjs/common';
import { ICommandHandler, CommandHandler } from '@nestjs/cqrs';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { IPaymentTransactionRepo,PAYMENT_TRANSACTION_REPO } from '../../i-payment-transaction.repo';
import { PaymentTransaction } from '../../domain';
import { CreatePaymentTransactionCommand } from './create-payment-transaction.command';

@CommandHandler(CreatePaymentTransactionCommand)
export class CreatePaymentTransactionCommandHandler implements ICommandHandler<CreatePaymentTransactionCommand, PaymentTransaction> {
  constructor(
    @Inject(PAYMENT_TRANSACTION_REPO) protected readonly repo: IPaymentTransactionRepo,
    @InjectPinoLogger(CreatePaymentTransactionCommandHandler.name) protected readonly logger: PinoLogger,
  ) {}

  public async execute(command: CreatePaymentTransactionCommand): Promise<PaymentTransaction> {
    this.logger.info(`Executing Command "${CreatePaymentTransactionCommand.name}"`);
    const tx = new PaymentTransaction();
    tx.orgId = command.orgId;
    tx.referenceId = command.referenceId;
    tx.referenceType = command.referenceType;
    tx.type = command.type;
    tx.method = command.method;
    tx.amount = command.amount;
    tx.status = command.status || 'PENDING';
    return this.repo.createAsync(tx);
  }
}
