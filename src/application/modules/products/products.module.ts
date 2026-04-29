import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { ProductsController } from './products.controller';
import { ProductCommandHandlers } from './commands';
import { ProductQueryHandlers } from './queries';
import { ProductProfile } from './mapper';
import { ProductFeatureOptions } from './options';
import { ProductFilterNormalizer } from './helpers';

@Module({
  imports:     [CqrsModule],
  controllers: [ProductsController],
  providers:   [
    ...ProductCommandHandlers,
    ...ProductQueryHandlers,
    ProductProfile,
    ProductFeatureOptions,
    ProductFilterNormalizer,
  ],
})
export class ProductsModule {}
