import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { StoresController } from './stores.controller';
import { StoreCommandHandlers } from './commands';
import { StoreQueryHandlers } from './queries';
import { StoreProfile } from './mapper';
import { StoreFeatureOptions } from './options';
import { StoreFilterNormalizer } from './helpers';

@Module({
  imports:     [CqrsModule],
  controllers: [StoresController],
  providers:   [
    ...StoreCommandHandlers,
    ...StoreQueryHandlers,
    StoreProfile,
    StoreFeatureOptions,
    StoreFilterNormalizer,
  ],
})
export class StoresModule {}
