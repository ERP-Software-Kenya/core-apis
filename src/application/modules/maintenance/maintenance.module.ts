import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { MaintenanceController } from './maintenance.controller';
import { MaintenanceCommandHandlers } from './commands';
import { MaintenanceQueryHandlers } from './queries';
import { MaintenanceProfile } from './mapper';

@Module({
  imports:     [CqrsModule],
  controllers: [MaintenanceController],
  providers:   [
    ...MaintenanceCommandHandlers,
    ...MaintenanceQueryHandlers,
    MaintenanceProfile,
  ],
})
export class MaintenanceModule {}
