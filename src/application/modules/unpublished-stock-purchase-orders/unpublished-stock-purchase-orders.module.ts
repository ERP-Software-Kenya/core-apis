import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { SharedModule } from 'src/application/shared';
import { UnpublishedStockPurchaseOrdersController } from './unpublished-stock-purchase-orders.controller';
import { UnpublishedStockPOCommandHandlers } from './commands';
import { UnpublishedStockPOQueryHandlers } from './queries';
import { UnpublishedStockPOProfile } from './mapper';
import { UnpublishedStockPOFeatureOptions } from './options';
import { UnpublishedStockPOFilterNormalizer } from './helpers';

@Module({
  imports:     [CqrsModule, SharedModule],
  controllers: [UnpublishedStockPurchaseOrdersController],
  providers:   [
    ...UnpublishedStockPOCommandHandlers,
    ...UnpublishedStockPOQueryHandlers,
    UnpublishedStockPOProfile,
    UnpublishedStockPOFeatureOptions,
    UnpublishedStockPOFilterNormalizer,
  ],
})
export class UnpublishedStockPurchaseOrdersModule {}
