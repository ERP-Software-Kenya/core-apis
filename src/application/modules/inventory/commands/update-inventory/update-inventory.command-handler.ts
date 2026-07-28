import { Inject } from '@nestjs/common';
import { ICommandHandler } from '@nestjs/cqrs';
import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { CommandHandlerStrict } from 'src/common';
import { INVENTORY_REPO } from '../../../../constants';
import { Inventory } from '../../domain';
import { IInventoryRepo } from '../../i-inventory.repo';
import { UpdateInventoryCommand } from './update-inventory.command';

@CommandHandlerStrict(UpdateInventoryCommand)
export class UpdateInventoryCommandHandler implements ICommandHandler<UpdateInventoryCommand, Inventory> {
  constructor(
    @Inject(INVENTORY_REPO) private readonly repo: IInventoryRepo,
    @InjectMapper() private readonly mapper: Mapper,
    @InjectPinoLogger(UpdateInventoryCommandHandler.name) private readonly logger: PinoLogger,
  ) {}

  public async execute(command: UpdateInventoryCommand): Promise<Inventory> {
    this.logger.info(`Executing ${UpdateInventoryCommand.name} id=${command.id}`);
    const existing = await this.repo.getAsync(command.id);
    const patch    = this.mapper.map(command, UpdateInventoryCommand, Inventory);
    (Object.keys(patch) as Array<keyof Inventory>).forEach((key) => {
      if (patch[key] !== undefined) {
        (existing as unknown as Record<string, unknown>)[key] = patch[key];
      }
    });
    return this.repo.updateAsync(existing);
  }
}
