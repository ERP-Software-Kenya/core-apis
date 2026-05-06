import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { PurchaseItemsController } from './purchase-items.controller';
import { PurchaseItemCommandHandlers } from './commands';
import { PurchaseItemQueryHandlers } from './queries';
import { PurchaseItemProfile } from './mapper';

@Module({
  imports:     [CqrsModule],
  controllers: [PurchaseItemsController],
  providers:   [
    ...PurchaseItemCommandHandlers,
    ...PurchaseItemQueryHandlers,
    PurchaseItemProfile,
  ],
})
export class PurchaseItemsModule {}
