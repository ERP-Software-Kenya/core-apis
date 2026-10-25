import { Inject } from '@nestjs/common';
import { ICommandHandler } from '@nestjs/cqrs';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { CommandHandlerStrict } from '../../../../../common';
import { CUSTOMER_CREDIT_TRANSACTION_REPO } from '../../../../constants';
import { ICustomerCreditTransactionRepo } from '../../../credit-approvals/i-customer-credit-transaction.repo';
import { Customer } from '../../domain';
import { CreateCreditTransactionCommand } from './create-credit-transaction.command';

@CommandHandlerStrict(CreateCreditTransactionCommand)
export class CreateCreditTransactionCommandHandler
  implements ICommandHandler<CreateCreditTransactionCommand, Customer>
{
  constructor(
    @Inject(CUSTOMER_CREDIT_TRANSACTION_REPO) private readonly txRepo: ICustomerCreditTransactionRepo,
    @InjectPinoLogger(CreateCreditTransactionCommandHandler.name) private readonly logger: PinoLogger,
  ) {}

  public async execute(command: CreateCreditTransactionCommand): Promise<Customer> {
    this.logger.info(`Executing ${CreateCreditTransactionCommand.name} customerId=${command.customerId} type=${command.type}`);

    return this.txRepo.recordCustomerBalanceTransactionAsync({
      customerId: command.customerId,
      organizationId: command.organizationId,
      type: command.type,
      amount: Number(command.amount),
      paymentMethod: command.paymentMethod,
      note: command.note,
      performedById: command.performedById,
    });
  }
}
