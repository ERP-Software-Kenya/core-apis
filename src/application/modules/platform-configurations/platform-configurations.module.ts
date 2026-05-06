import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { PlatformConfigurationsController } from './platform-configurations.controller';
import { PlatformConfigurationCommandHandlers } from './commands';
import { PlatformConfigurationQueryHandlers } from './queries';
import { PlatformConfigurationProfile } from './mapper';

@Module({
  imports:     [CqrsModule],
  controllers: [PlatformConfigurationsController],
  providers:   [
    ...PlatformConfigurationCommandHandlers,
    ...PlatformConfigurationQueryHandlers,
    PlatformConfigurationProfile,
  ],
})
export class PlatformConfigurationsModule {}
