import { Inject } from '@nestjs/common';
import { ICommandHandler } from '@nestjs/cqrs';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { CommandHandlerStrict } from '../../../../../common';
import { CUSTOMER_REPO } from '../../../../constants';
import { Customer } from '../../domain';
import { CreateCustomerCommand } from './create-customer.command';
import { ICustomerRepo } from '../../i-customer.repo';

@CommandHandlerStrict(CreateCustomerCommand)
export class CreateCustomerCommandHandler implements ICommandHandler<CreateCustomerCommand, Customer> {
  constructor(
    @Inject(CUSTOMER_REPO) private readonly repo: ICustomerRepo,
    @InjectPinoLogger(CreateCustomerCommandHandler.name) private readonly logger: PinoLogger,
  ) {}

  public async execute(command: CreateCustomerCommand): Promise<Customer> {
    this.logger.info(`Executing ${CreateCustomerCommand.name}`);
    return this.repo.createAsync(command as any);
  }
}
