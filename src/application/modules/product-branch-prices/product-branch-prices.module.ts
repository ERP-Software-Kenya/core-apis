import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { SharedModule } from '../../shared';
import { ProductBranchPricesController } from './product-branch-prices.controller';
import { ProductBranchPriceCommandHandlers } from './commands';
import { ProductBranchPriceQueryHandlers } from './queries';
import { ProductBranchPriceProfile } from './mapper';

@Module({
  imports:     [CqrsModule, SharedModule],
  controllers: [ProductBranchPricesController],
  providers:   [
    ...ProductBranchPriceCommandHandlers,
    ...ProductBranchPriceQueryHandlers,
    ProductBranchPriceProfile,
  ],
})
export class ProductBranchPricesModule {}
