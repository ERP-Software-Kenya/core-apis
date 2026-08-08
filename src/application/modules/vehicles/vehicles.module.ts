import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { VehiclesController } from './vehicles.controller';
import { VehicleCommandHandlers } from './commands';
import { VehicleQueryHandlers } from './queries';
import { VehicleProfile } from './mapper';
import { VehicleFilterNormalizer } from './helpers/vehicle-filter.normalizer';
import { VehicleFeatureOptions } from './options/vehicle-feature.options';

@Module({
  imports:     [CqrsModule],
  controllers: [VehiclesController],
  providers:   [
    ...VehicleCommandHandlers,
    ...VehicleQueryHandlers,
    VehicleProfile,
    VehicleFilterNormalizer,
    VehicleFeatureOptions,
  ],
})
export class VehiclesModule {}
