import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { SharedModule } from 'src/application/shared';
import { PurchaseOrdersController } from './purchase-orders.controller';
import { PurchaseOrderCommandHandlers } from './commands';
import { PurchaseOrderQueryHandlers } from './queries';
import { PurchaseOrderProfile } from './mapper';
import { PurchaseOrderFeatureOptions } from './options';
import { PurchaseOrderFilterNormalizer } from './helpers';

@Module({
  imports:     [CqrsModule, SharedModule],
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
