import { Inject } from '@nestjs/common';
import { ICommandHandler } from '@nestjs/cqrs';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { CommandHandlerStrict } from '../../../../../common';
import { INVENTORY_REPO } from '../../../../constants';
import { IInventoryRepo } from '../..';
import { DeleteInventoryCommand } from './delete-inventory.command';

@CommandHandlerStrict(DeleteInventoryCommand)
export class DeleteInventoryCommandHandler implements ICommandHandler<DeleteInventoryCommand, boolean> {
  constructor(
    @Inject(INVENTORY_REPO) private readonly repo: IInventoryRepo,
    @InjectPinoLogger(DeleteInventoryCommandHandler.name) private readonly logger: PinoLogger,
  ) {}

  public async execute(command: DeleteInventoryCommand): Promise<boolean> {
    this.logger.info(`Executing ${DeleteInventoryCommand.name} id=${command.id}`);
    await this.repo.deleteAsync(command.id);
    return true;
  }
}
