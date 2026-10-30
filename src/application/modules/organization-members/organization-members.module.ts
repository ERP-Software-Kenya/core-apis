import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MailOptions } from '../../../common';
import { ICoreApiConfig } from '../../../configuration';
import { LocationEntity, OrganizationEntity, OrganizationInvitationEntity, OrgMemberEntity, RoleEntity, UserEntity, UserRoleEntity } from '../../../infrastructure';
import { OrganizationInvitationMailService } from './organization-invitation-mail.service';
import { OrganizationInvitationsController, OrganizationMembersController, PublicOrganizationInvitationsController } from './organization-members.controller';
import { OrganizationMembersService } from './organization-members.service';

@Module({
  imports: [TypeOrmModule.forFeature([OrganizationInvitationEntity, OrgMemberEntity, UserEntity, UserRoleEntity, RoleEntity, LocationEntity, OrganizationEntity])],
  controllers: [OrganizationInvitationsController, PublicOrganizationInvitationsController, OrganizationMembersController],
  providers: [
    { provide: MailOptions, useFactory: (config: ConfigService<ICoreApiConfig>) => { const cfg = config.get<ICoreApiConfig['mail']>('mail'); return new MailOptions(cfg.host, cfg.port, cfg.secure, cfg.user, cfg.password, cfg.from); }, inject: [ConfigService] },
    OrganizationInvitationMailService, OrganizationMembersService,
  ],
})
export class OrganizationMembersModule {}
