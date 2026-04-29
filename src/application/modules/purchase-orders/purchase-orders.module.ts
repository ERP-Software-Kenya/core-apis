import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { PurchaseOrdersController } from './purchase-orders.controller';
import { PurchaseOrderCommandHandlers } from './commands';
import { PurchaseOrderQueryHandlers } from './queries';
import { PurchaseOrderProfile } from './mapper';
import { PurchaseOrderFeatureOptions } from './options';
import { PurchaseOrderFilterNormalizer } from './helpers';

@Module({
  imports:     [CqrsModule],
  controllers: [PurchaseOrdersController],
  providers:   [
    ...PurchaseOrderCommandHandlers,
    ...PurchaseOrderQueryHandlers,
    PurchaseOrderProfile,
    PurchaseOrderFeatureOptions,
    PurchaseOrderFilterNormalizer,
  ],
})
export class PurchaseOrdersModule {}
