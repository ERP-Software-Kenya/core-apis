import { Inject } from '@nestjs/common';
import { ICommandHandler } from '@nestjs/cqrs';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { CommandHandlerStrict } from '../../../../../common';
import { INVENTORY_REPO } from '../../../../constants';
import { Inventory } from '../../domain';
import { IInventoryRepo } from '../..';
import { UpdateInventoryCommand } from './update-inventory.command';

@CommandHandlerStrict(UpdateInventoryCommand)
export class UpdateInventoryCommandHandler implements ICommandHandler<UpdateInventoryCommand, Inventory> {
  constructor(
    @Inject(INVENTORY_REPO) private readonly repo: IInventoryRepo,
    @InjectPinoLogger(UpdateInventoryCommandHandler.name) private readonly logger: PinoLogger,
  ) {}

  public async execute(command: UpdateInventoryCommand): Promise<Inventory> {
    this.logger.info(`Executing ${UpdateInventoryCommand.name} id=${command.id}`);
    const entity = await this.repo.getAsync(command.id);
    if(command.name) entity.name = command.name;
    return this.repo.updateAsync(entity);
  }
}
