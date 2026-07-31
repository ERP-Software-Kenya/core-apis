import { Inject, NotFoundException } from '@nestjs/common';
import { ICommandHandler } from '@nestjs/cqrs';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { CommandHandlerStrict } from '../../../../../common';
import { CUSTOMER_REPO } from '../../../../constants';
import { ICustomerRepo } from '../../i-customer.repo';
import { DeleteCustomerCommand } from './delete-customer.command';

@CommandHandlerStrict(DeleteCustomerCommand)
export class DeleteCustomerCommandHandler implements ICommandHandler<DeleteCustomerCommand, boolean> {
  constructor(
    @Inject(CUSTOMER_REPO) private readonly repo: ICustomerRepo,
    @InjectPinoLogger(DeleteCustomerCommandHandler.name) private readonly logger: PinoLogger,
  ) {}

  public async execute(command: DeleteCustomerCommand): Promise<boolean> {
    this.logger.info(`Executing ${DeleteCustomerCommand.name} id=${command.id}`);
    const existing = await this.repo.getAsync(command.id);
    if (!existing) throw new NotFoundException(`Customer ${command.id} not found`);
    return this.repo.deleteAsync(command.id);
  }
}
