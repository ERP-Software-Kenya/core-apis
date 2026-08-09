import { Inject } from '@nestjs/common';
import { ICommandHandler } from '@nestjs/cqrs';
import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { CommandHandlerStrict } from '../../../../../common';
import { SUPPLIER_REPO } from '../../../../constants';
import { Supplier } from '../../domain';
import { ISupplierRepo } from '../..';
import { UpdateSupplierCommand } from './update-supplier.command';

@CommandHandlerStrict(UpdateSupplierCommand)
export class UpdateSupplierCommandHandler implements ICommandHandler<UpdateSupplierCommand, Supplier> {
  constructor(
    @Inject(SUPPLIER_REPO) private readonly repo: ISupplierRepo,
    @InjectMapper() private readonly mapper: Mapper,
    @InjectPinoLogger(UpdateSupplierCommandHandler.name) private readonly logger: PinoLogger,
  ) {}

  public async execute(command: UpdateSupplierCommand): Promise<Supplier> {
    this.logger.info(`Executing ${UpdateSupplierCommand.name} id=${command.id}`);
    const existing = await this.repo.getAsync(command.id);
    const patch    = this.mapper.map(command, UpdateSupplierCommand, Supplier);

    (Object.keys(patch) as Array<keyof Supplier>).forEach((key) => {
      if (patch[key] !== undefined && patch[key] !== existing[key]) {
        (existing as unknown as Record<string, unknown>)[key] = patch[key];
      }
    });

    return this.repo.updateAsync(existing);
  }
}
