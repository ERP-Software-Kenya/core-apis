import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { OrganizationUnitsController } from './organization-units.controller';
import { OrganizationUnitProfile } from './mapper';
import { OrganizationUnitCommandHandlers } from './commands';
import { OrganizationUnitQueryHandlers } from './queries';

@Module({
  imports:     [CqrsModule],
  controllers: [OrganizationUnitsController],
  providers:   [
    ...OrganizationUnitCommandHandlers,
    ...OrganizationUnitQueryHandlers,
    OrganizationUnitProfile,
  ],
})
export class OrganizationUnitsModule {}
