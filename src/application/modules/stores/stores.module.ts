import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { CqrsModule } from '@nestjs/cqrs';
import { R2StorageOptions } from 'src/common';
import { StoresController } from './stores.controller';
import { StoreCommandHandlers } from './commands';
import { StoreQueryHandlers } from './queries';
import { StoreProfile } from './mapper';
import { StoreFeatureOptions } from './options';
import { StoreFilterNormalizer } from './helpers';
import { StoreImageStorage } from './storage';

@Module({
  imports:     [CqrsModule],
  controllers: [StoresController],
  providers:   [
    {
      provide:    R2StorageOptions,
      useFactory: (config: ConfigService): R2StorageOptions =>
        new R2StorageOptions(
          config.get('STORAGE_ENDPOINT', ''),
          config.get('STORAGE_REGION', ''),
          config.get('STORAGE_ACCESS_KEY_ID', ''),
          config.get('STORAGE_SECRET_ACCESS_KEY', ''),
          config.get('STORAGE_BUCKET', ''),
          config.get('STORAGE_PUBLIC_URL_BASE', ''),
        ),
      inject: [ConfigService],
    },
    StoreImageStorage,
    ...StoreCommandHandlers,
    ...StoreQueryHandlers,
    StoreProfile,
    StoreFeatureOptions,
    StoreFilterNormalizer,
  ],
})
export class StoresModule {}
