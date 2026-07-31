import { Inject } from '@nestjs/common';
import { ICommandHandler } from '@nestjs/cqrs';
import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { CommandHandlerStrict } from '../../../../../common';
import { CUSTOMER_REPO } from '../../../../constants';
import { Customer } from '../../domain';
import { ICustomerRepo } from '../../i-customer.repo';
import { CreateCustomerCommand } from './create-customer.command';

@CommandHandlerStrict(CreateCustomerCommand)
export class CreateCustomerCommandHandler implements ICommandHandler<CreateCustomerCommand, Customer> {
  constructor(
    @Inject(CUSTOMER_REPO) private readonly repo: ICustomerRepo,
    @InjectMapper() private readonly mapper: Mapper,
    @InjectPinoLogger(CreateCustomerCommandHandler.name) private readonly logger: PinoLogger,
  ) {}

  public async execute(command: CreateCustomerCommand): Promise<Customer> {
    this.logger.info(`Executing ${CreateCustomerCommand.name}`);
    const customer = this.mapper.map(command, CreateCustomerCommand, Customer);
    return this.repo.createAsync(customer);
  }
}
