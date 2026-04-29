import { Inject } from '@nestjs/common';
import { ICommandHandler } from '@nestjs/cqrs';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { CommandHandlerStrict } from '../../../../../common';
import { SUPPLIER_REPO } from '../../../../constants';
import { ISupplierRepo } from '../..';
import { DeleteSupplierCommand } from './delete-supplier.command';

@CommandHandlerStrict(DeleteSupplierCommand)
export class DeleteSupplierCommandHandler implements ICommandHandler<DeleteSupplierCommand, boolean> {
  constructor(
    @Inject(SUPPLIER_REPO) private readonly repo: ISupplierRepo,
    @InjectPinoLogger(DeleteSupplierCommandHandler.name) private readonly logger: PinoLogger,
  ) {}

  public async execute(command: DeleteSupplierCommand): Promise<boolean> {
    this.logger.info(`Executing ${DeleteSupplierCommand.name} id=${command.id}`);
    await this.repo.deleteAsync(command.id);
    return true;
  }
}
