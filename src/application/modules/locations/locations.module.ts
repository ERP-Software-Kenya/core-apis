import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { CqrsModule } from '@nestjs/cqrs';
import { R2StorageOptions } from 'src/common';
import { LocationsController } from './locations.controller';
import { LocationCommandHandlers } from './commands';
import { LocationQueryHandlers } from './queries';
import { LocationProfile } from './mapper';
import { LocationFeatureOptions } from './options';
import { LocationFilterNormalizer } from './helpers';
import { LocationImageStorage } from './storage';

@Module({
  imports:     [CqrsModule],
  controllers: [LocationsController],
  providers:   [
    {
      provide: R2StorageOptions,
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
    LocationImageStorage,
    ...LocationCommandHandlers,
    ...LocationQueryHandlers,
    LocationProfile,
    LocationFeatureOptions,
    LocationFilterNormalizer,
  ],
})
export class LocationsModule {}
