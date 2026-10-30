import { ConflictException, GoneException, Inject, NotFoundException } from '@nestjs/common';
import { IQueryHandler } from '@nestjs/cqrs';
import { ConfigService } from '@nestjs/config';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { createHash } from 'crypto';
import { QueryHandlerStrict } from '../../../../../common';
import { ORGANIZATION_INVITATION_REPO } from '../../../../constants';
import { EOrganizationInvitationStatus } from '../../../../../infrastructure';
import { OrganizationInvitation } from '../../domain';
import { IOrganizationInvitationRepo } from '../../i-organization-invitation.repo';
import { PublicOrganizationInvitationResponse } from '../../models';
import { ValidatePublicInvitationQuery } from './validate-public-invitation.query';

@QueryHandlerStrict(ValidatePublicInvitationQuery)
export class ValidatePublicInvitationQueryHandler implements IQueryHandler<ValidatePublicInvitationQuery, PublicOrganizationInvitationResponse> {
  public constructor(
    @Inject(ORGANIZATION_INVITATION_REPO) private readonly repo: IOrganizationInvitationRepo,
    private readonly config: ConfigService,
    @InjectPinoLogger(ValidatePublicInvitationQueryHandler.name) private readonly logger: PinoLogger,
  ) {}

  public async execute(query: ValidatePublicInvitationQuery): Promise<PublicOrganizationInvitationResponse> {
    this.logger.info(`Executing ${ValidatePublicInvitationQuery.name}`);
    const tokenHash = createHash('sha256').update(query.rawToken).digest('hex');
    const invitation = await this.repo.findByTokenHashAsync(tokenHash);
    if (!invitation) throw new NotFoundException('Invitation not found');
    await this.expireIfNeeded(invitation);
    this.assertUsable(invitation);
    return this.buildResponse(invitation, query.rawToken);
  }

  private async expireIfNeeded(invitation: OrganizationInvitation): Promise<void> {
    if (invitation.status === EOrganizationInvitationStatus.Pending && invitation.expiresAt <= new Date()) {
      await this.repo.updateAsync({ ...invitation, status: EOrganizationInvitationStatus.Expired });
      invitation.status = EOrganizationInvitationStatus.Expired;
    }
  }

  private assertUsable(invitation: OrganizationInvitation): void {
    if (invitation.status === EOrganizationInvitationStatus.Expired) {
      throw new GoneException({ code: 'INVITATION_EXPIRED', message: 'Invitation has expired' });
    }
    if (invitation.status === EOrganizationInvitationStatus.Revoked) {
      throw new GoneException({ code: 'INVITATION_REVOKED', message: 'Invitation was revoked' });
    }
    if (invitation.status === EOrganizationInvitationStatus.Failed) {
      throw new ConflictException({ code: 'INVITATION_DELIVERY_FAILED', message: 'Invitation delivery failed; request a resend' });
    }
    if (invitation.status !== EOrganizationInvitationStatus.Pending && invitation.status !== EOrganizationInvitationStatus.Accepted) {
      throw new ConflictException({ code: 'INVITATION_UNAVAILABLE', message: 'Invitation is not available' });
    }
  }

  private buildResponse(invitation: OrganizationInvitation, rawToken: string): PublicOrganizationInvitationResponse {
    const scheme = this.config.get<string>('ERP_APP_SCHEME') ?? 'erpapp';
    const response = new PublicOrganizationInvitationResponse();
    response.organizationName = invitation.organizationName;
    response.invitedEmailMasked = this.maskEmail(invitation.emailNormalized);
    response.roleName = invitation.roleName;
    response.status = invitation.status;
    response.expiresAt = invitation.expiresAt;
    response.appLink = `${scheme}://invite/${encodeURIComponent(rawToken)}`;
    response.androidInstallUrl = this.config.get<string>('ERP_ANDROID_INSTALL_URL');
    response.iosInstallUrl = this.config.get<string>('ERP_IOS_INSTALL_URL');
    response.desktopInstallUrl = this.config.get<string>('ERP_DESKTOP_INSTALL_URL');
    return response;
  }

  private maskEmail(email: string): string {
    const [name, domain] = email.split('@');
    return `${name.slice(0, 1)}${'*'.repeat(Math.max(2, name.length - 1))}@${domain}`;
  }
}
