import { Global, Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { BillingSettingsController } from './billing-settings.controller';
import { BillingSettingsCommandHandlers } from './commands';
import { BillingSettingsQueryHandlers } from './queries';
import { BillingSettingsProfile } from './mapper';
import { OrganizationSettingsService } from './organization-settings.service';

@Global()
@Module({
  imports:     [CqrsModule],
  controllers: [BillingSettingsController],
  providers:   [
    ...BillingSettingsCommandHandlers,
    ...BillingSettingsQueryHandlers,
    BillingSettingsProfile,
    OrganizationSettingsService,
  ],
  exports: [OrganizationSettingsService],
})
export class BillingSettingsModule {}
