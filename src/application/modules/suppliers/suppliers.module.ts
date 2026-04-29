import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { SuppliersController } from './suppliers.controller';
import { SupplierCommandHandlers } from './commands';
import { SupplierQueryHandlers } from './queries';
import { SupplierProfile } from './mapper';
import { SupplierFeatureOptions } from './options';
import { SupplierFilterNormalizer } from './helpers';

@Module({
  imports:     [CqrsModule],
  controllers: [SuppliersController],
  providers:   [
    ...SupplierCommandHandlers,
    ...SupplierQueryHandlers,
    SupplierProfile,
    SupplierFeatureOptions,
    SupplierFilterNormalizer,
  ],
})
export class SuppliersModule {}
