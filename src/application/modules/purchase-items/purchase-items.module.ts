import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { PurchaseItemsController } from './purchase-items.controller';
import { PurchaseItemCommandHandlers } from './commands';
import { PurchaseItemQueryHandlers } from './queries';
import { PurchaseItemProfile } from './mapper';
import { SharedModule } from '../../shared';

@Module({
  imports:     [CqrsModule, SharedModule],
  controllers: [PurchaseItemsController],
  providers:   [
    ...PurchaseItemCommandHandlers,
    ...PurchaseItemQueryHandlers,
    PurchaseItemProfile,
  ],
})
export class PurchaseItemsModule {}
