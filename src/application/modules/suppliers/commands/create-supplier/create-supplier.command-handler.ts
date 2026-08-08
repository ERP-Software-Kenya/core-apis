import { Inject } from '@nestjs/common';
import { ICommandHandler } from '@nestjs/cqrs';
import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
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
    @InjectMapper() private readonly mapper: Mapper,
    @InjectPinoLogger(CreateSupplierCommandHandler.name) private readonly logger: PinoLogger,
  ) {}

  public async execute(command: CreateSupplierCommand): Promise<Supplier> {
    this.logger.info(`Executing ${CreateSupplierCommand.name}`);
    const supplier = this.mapper.map(command, CreateSupplierCommand, Supplier);
    return this.repo.createAsync(supplier);
  }
}
