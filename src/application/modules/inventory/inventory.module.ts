import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { InventoryController } from './inventory.controller';
import { InventoryCommandHandlers } from './commands';
import { InventoryQueryHandlers } from './queries';
import { InventoryProfile } from './mapper';
import { InventoryFeatureOptions } from './options';
import { InventoryFilterNormalizer } from './helpers';

@Module({
  imports:     [CqrsModule],
  controllers: [InventoryController],
  providers:   [
    ...InventoryCommandHandlers,
    ...InventoryQueryHandlers,
    InventoryProfile,
    InventoryFeatureOptions,
    InventoryFilterNormalizer,
  ],
})
export class InventoryModule {}
