import { Inject } from '@nestjs/common';
import { ICommandHandler } from '@nestjs/cqrs';
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
    @InjectPinoLogger(UpdateSupplierCommandHandler.name) private readonly logger: PinoLogger,
  ) {}

  public async execute(command: UpdateSupplierCommand): Promise<Supplier> {
    this.logger.info(`Executing ${UpdateSupplierCommand.name} id=${command.id}`);
    const entity = await this.repo.getAsync(command.id);
    if(command.name) entity.name = command.name;
    return this.repo.updateAsync(entity);
  }
}
