import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { DriversController } from './drivers.controller';
import { DriverCommandHandlers } from './commands';
import { DriverQueryHandlers } from './queries';
import { DriverProfile } from './mapper';
import { DriverFilterNormalizer } from './helpers/driver-filter.normalizer';
import { DriverFeatureOptions } from './options/driver-feature.options';

@Module({
  imports:     [CqrsModule],
  controllers: [DriversController],
  providers:   [
    ...DriverCommandHandlers,
    ...DriverQueryHandlers,
    DriverProfile,
    DriverFilterNormalizer,
    DriverFeatureOptions,
  ],
})
export class DriversModule {}
