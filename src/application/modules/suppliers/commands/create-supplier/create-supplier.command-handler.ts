import { Inject } from '@nestjs/common';
import { ICommandHandler } from '@nestjs/cqrs';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { CommandHandlerStrict } from '../../../../../common';
import { SUPPLIER_REPO } from '../../../../constants';
import { Supplier } from '../../domain';
import { ISupplierRepo } from '../..';
import { CreateSupplierCommand } from './create-supplier.command';

@CommandHandlerStrict(CreateSupplierCommand)
export class CreateSupplierCommandHandler implements ICommandHandler<CreateSupplierCommand, Supplier> {
  constructor(
    @Inject(SUPPLIER_REPO) private readonly repo: ISupplierRepo,
    @InjectPinoLogger(CreateSupplierCommandHandler.name) private readonly logger: PinoLogger,
  ) {}

  public async execute(command: CreateSupplierCommand): Promise<Supplier> {
    this.logger.info(`Executing ${CreateSupplierCommand.name}`);
    return this.repo.createAsync({ name: command.name } as Supplier);
  }
}
