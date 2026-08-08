import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { CqrsModule } from '@nestjs/cqrs';
import { SharedModule } from 'src/application/shared';
import { ProductsController } from './products.controller';
import { ProductCommandHandlers } from './commands';
import { ProductQueryHandlers } from './queries';
import { ProductProfile } from './mapper';
import { ProductFeatureOptions } from './options';
import { ProductFilterNormalizer } from './helpers';
import { ProductImageStorage } from './storage';
import { R2StorageOptions } from '../../../common';

@Module({
  imports:     [CqrsModule, SharedModule],
  controllers: [ProductsController],
  providers:   [
    {
      provide: R2StorageOptions,
      useFactory: (config: ConfigService): R2StorageOptions => {
        return new R2StorageOptions(
          config.get('STORAGE_ENDPOINT', ''),
          config.get('STORAGE_REGION', ''),
          config.get('STORAGE_ACCESS_KEY_ID', ''),
          config.get('STORAGE_SECRET_ACCESS_KEY', ''),
          config.get('STORAGE_BUCKET', ''),
          config.get('STORAGE_PUBLIC_URL_BASE', ''),
        );
      },
      inject: [ConfigService],
    },
    ProductImageStorage,
    ...ProductCommandHandlers,
    ...ProductQueryHandlers,
    ProductProfile,
    ProductFeatureOptions,
    ProductFilterNormalizer,
  ],
})
export class ProductsModule {}
