import { Inject } from '@nestjs/common';
import { ICommandHandler } from '@nestjs/cqrs';
import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { CommandHandlerStrict, RpcConflictException } from 'src/common';
import { INVENTORY_REPO } from '../../../../constants';
import { Inventory } from '../../domain';
import { IInventoryRepo } from '../../i-inventory.repo';
import { CreateInventoryCommand } from './create-inventory.command';

@CommandHandlerStrict(CreateInventoryCommand)
export class CreateInventoryCommandHandler implements ICommandHandler<CreateInventoryCommand, Inventory> {
  constructor(
    @Inject(INVENTORY_REPO) private readonly repo: IInventoryRepo,
    @InjectMapper() private readonly mapper: Mapper,
    @InjectPinoLogger(CreateInventoryCommandHandler.name) private readonly logger: PinoLogger,
  ) {}

  public async execute(command: CreateInventoryCommand): Promise<Inventory> {
    this.logger.info(`Executing ${CreateInventoryCommand.name}`);
    const inventory = this.mapper.map(command, CreateInventoryCommand, Inventory);
    try {
      const created = await this.repo.createAsync(inventory);
      return this.repo.getAsync(created.id);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err);
      if (msg.includes('UQ__inventory__org_location_product_unit')) {
        throw new RpcConflictException('An inventory entry for this product and unit already exists at this location. Update the existing entry instead.');
      }
      throw err;
    }
  }
}
