import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { ConfigService } from '@nestjs/config';
import { MailOptions } from '../../../common';
import { ICoreApiConfig } from '../../../configuration';
import { OrganizationMembersCommandHandlers } from './commands';
import { OrganizationMembersQueryHandlers } from './queries';
import { OrganizationInvitationProfile } from './mapper';
import { OrganizationInvitationMailService } from './organization-invitation-mail.service';
import { OrganizationInvitationsController } from './organization-invitations.controller';
import { PublicOrganizationInvitationsController } from './public-organization-invitations.controller';
import { OrganizationMembersController } from './organization-members.controller';

@Module({
  imports: [CqrsModule],
  controllers: [
    OrganizationInvitationsController,
    PublicOrganizationInvitationsController,
    OrganizationMembersController,
  ],
  providers: [
    ...OrganizationMembersCommandHandlers,
    ...OrganizationMembersQueryHandlers,
    OrganizationInvitationProfile,
    OrganizationInvitationMailService,
    {
      provide: MailOptions,
      useFactory: (config: ConfigService<ICoreApiConfig>) => {
        const cfg = config.get<ICoreApiConfig['mail']>('mail');
        return new MailOptions(cfg.host, cfg.port, cfg.secure, cfg.user, cfg.password, cfg.from);
      },
      inject: [ConfigService],
    },
  ],
})
export class OrganizationMembersModule {}
