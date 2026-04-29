import { Inject } from '@nestjs/common';
import { ICommandHandler } from '@nestjs/cqrs';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { CommandHandlerStrict } from '../../../../../common';
import { INVENTORY_REPO } from '../../../../constants';
import { Inventory } from '../../domain';
import { IInventoryRepo } from '../..';
import { CreateInventoryCommand } from './create-inventory.command';

@CommandHandlerStrict(CreateInventoryCommand)
export class CreateInventoryCommandHandler implements ICommandHandler<CreateInventoryCommand, Inventory> {
  constructor(
    @Inject(INVENTORY_REPO) private readonly repo: IInventoryRepo,
    @InjectPinoLogger(CreateInventoryCommandHandler.name) private readonly logger: PinoLogger,
  ) {}

  public async execute(command: CreateInventoryCommand): Promise<Inventory> {
    this.logger.info(`Executing ${CreateInventoryCommand.name}`);
    return this.repo.createAsync({ name: command.name } as Inventory);
  }
}
