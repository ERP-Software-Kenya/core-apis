import { Inject, NotFoundException } from '@nestjs/common';
import { ICommandHandler } from '@nestjs/cqrs';
import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { CommandHandlerStrict } from '../../../../../common';
import { CUSTOMER_REPO } from '../../../../constants';
import { Customer } from '../../domain';
import { ICustomerRepo } from '../../i-customer.repo';
import { UpdateCustomerCommand } from './update-customer.command';

@CommandHandlerStrict(UpdateCustomerCommand)
export class UpdateCustomerCommandHandler implements ICommandHandler<UpdateCustomerCommand, Customer> {
  constructor(
    @Inject(CUSTOMER_REPO) private readonly repo: ICustomerRepo,
    @InjectMapper() private readonly mapper: Mapper,
    @InjectPinoLogger(UpdateCustomerCommandHandler.name) private readonly logger: PinoLogger,
  ) {}

  public async execute(command: UpdateCustomerCommand): Promise<Customer> {
    this.logger.info(`Executing ${UpdateCustomerCommand.name} id=${command.id}`);
    const existing = await this.repo.getAsync(command.id);
    if (!existing) throw new NotFoundException(`Customer ${command.id} not found`);
    const patch = this.mapper.map(command, UpdateCustomerCommand, Customer);
    const merged = Object.assign(existing, Object.fromEntries(
      Object.entries(patch as object).filter(([, val]) => val !== undefined),
    ));
    return this.repo.updateAsync(merged);
  }
}
