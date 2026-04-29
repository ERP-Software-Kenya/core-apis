import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { OrganizationsController } from './organizations.controller';
import { OrganizationCommandHandlers } from './commands';
import { OrganizationQueryHandlers } from './queries';
import { OrganizationProfile } from './mapper';
import { OrganizationFeatureOptions } from './options';
import { OrganizationFilterNormalizer } from './helpers';

@Module({
  imports:     [CqrsModule],
  controllers: [OrganizationsController],
  providers:   [
    ...OrganizationCommandHandlers,
    ...OrganizationQueryHandlers,
    OrganizationProfile,
    OrganizationFeatureOptions,
    OrganizationFilterNormalizer,
  ],
})
export class OrganizationsModule {}
