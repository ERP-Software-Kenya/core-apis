import { Inject } from '@nestjs/common';
import { ICommandHandler } from '@nestjs/cqrs';
import { ConfigService } from '@nestjs/config';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { createHash, randomBytes } from 'crypto';
import { BadRequestException, ConflictException, ForbiddenException, NotFoundException } from '@nestjs/common';
import { CommandHandlerStrict } from '../../../../../common';
import {
  LOCATION_REPO, ORGANIZATION_INVITATION_REPO, ORGANIZATION_REPO, ROLE_REPO, USER_REPO,
} from '../../../../constants';
import { ILocationRepo } from '../../../locations';
import { IOrganizationRepo } from '../../../organizations';
import { IRoleRepo } from '../../../roles';
import { IUserRepo } from '../../../users';
import { EOrganizationInvitationStatus, ERole } from '../../../../../infrastructure';
import { OrganizationInvitation } from '../../domain';
import { IOrganizationInvitationRepo } from '../../i-organization-invitation.repo';
import { OrganizationInvitationMailService } from '../../organization-invitation-mail.service';
import { OrganizationInvitationResponse } from '../../models';
import { CreateInvitationCommand } from './create-invitation.command';

@CommandHandlerStrict(CreateInvitationCommand)
export class CreateInvitationCommandHandler implements ICommandHandler<CreateInvitationCommand, OrganizationInvitationResponse> {
  constructor(
    @Inject(ORGANIZATION_INVITATION_REPO) private readonly repo: IOrganizationInvitationRepo,
    @Inject(ORGANIZATION_REPO) private readonly orgRepo: IOrganizationRepo,
    @Inject(ROLE_REPO) private readonly roleRepo: IRoleRepo,
    @Inject(LOCATION_REPO) private readonly locationRepo: ILocationRepo,
    @Inject(USER_REPO) private readonly userRepo: IUserRepo,
    private readonly mail: OrganizationInvitationMailService,
    private readonly config: ConfigService,
    @InjectPinoLogger(CreateInvitationCommandHandler.name) private readonly logger: PinoLogger,
  ) {}

  public async execute(command: CreateInvitationCommand): Promise<OrganizationInvitationResponse> {
    this.logger.info(`Executing ${CreateInvitationCommand.name}`);
    const organizationId = this.resolveOrganizationId(command);
    const emailNormalized = command.email.trim().toLowerCase();
    await this.validateInputs(organizationId, emailNormalized, command);
    const { raw, hash } = this.makeToken();
    const now = new Date();
    const domain = this.buildDomain(command, organizationId, emailNormalized, hash, now);
    const created = await this.repo.createAsync(domain);
    return this.sendAndReturn(created, raw, command);
  }

  private resolveOrganizationId(command: CreateInvitationCommand): string {
    if (command.currentRoles.includes(ERole.SuperAdmin)) {
      const orgId = command.organizationId ?? command.currentOrganizationId;
      if (!orgId) throw new BadRequestException('Organization is required');
      return orgId;
    }
    if (!command.currentOrganizationId) throw new ForbiddenException('No organization assigned');
    return command.currentOrganizationId;
  }

  private async validateInputs(organizationId: string, emailNormalized: string, command: CreateInvitationCommand): Promise<void> {
    const [org, role, location, existingUser, pending] = await Promise.all([
      this.orgRepo.getAsync(organizationId),
      this.roleRepo.getAsync(command.roleId),
      command.locationId ? this.locationRepo.getAsync(command.locationId) : Promise.resolve(null),
      this.userRepo.findByEmailAsync(emailNormalized),
      this.repo.findPendingByOrgAndEmailAsync(organizationId, emailNormalized),
    ]);
    if (!org) throw new NotFoundException('Organization not found');
    if (!role) throw new NotFoundException('Role not found');
    if (role.name === ERole.SuperAdmin) throw new ForbiddenException('SuperAdmin cannot be invited');
    if (command.locationId && !location) throw new NotFoundException('Location not found');
    if (location && location.organizationId !== organizationId) {
      throw new ForbiddenException('Location does not belong to this organization');
    }
    if (existingUser?.organizationId === organizationId) {
      throw new ConflictException('User is already a member of this organization');
    }
    if (existingUser?.organizationId) {
      throw new ConflictException('User already belongs to another organization');
    }
    if (pending) throw new ConflictException('A pending invitation already exists for this email');
  }

  private buildDomain(
    command: CreateInvitationCommand, organizationId: string, emailNormalized: string, hash: string, now: Date,
  ): OrganizationInvitation {
    const parsed = parseInt(this.config.get<string>('ERP_INVITE_EXPIRY_HOURS') ?? '72', 10);
    const hours = isNaN(parsed) || parsed <= 0 ? 72 : parsed;
    const domain = new OrganizationInvitation();
    domain.organizationId = organizationId;
    domain.email = command.email.trim();
    domain.emailNormalized = emailNormalized;
    domain.firstName = command.firstName?.trim();
    domain.lastName = command.lastName?.trim();
    domain.roleId = command.roleId;
    domain.locationId = command.locationId;
    domain.invitedByUserId = command.currentUserId;
    domain.tokenHash = hash;
    domain.status = EOrganizationInvitationStatus.Pending;
    domain.expiresAt = new Date(now.getTime() + hours * 3_600_000);
    domain.lastSentAt = now;
    domain.sendCount = 1;
    domain.organizationName = '';
    domain.roleName = '';
    return domain;
  }

  private async sendAndReturn(created: OrganizationInvitation, raw: string, command: CreateInvitationCommand): Promise<OrganizationInvitationResponse> {
    const [org, role] = await Promise.all([
      this.orgRepo.getAsync(created.organizationId),
      this.roleRepo.getAsync(created.roleId),
    ]);
    const orgName = (org as { name?: string })?.name ?? '';
    const roleName = (role as { name?: string })?.name ?? '';
    try {
      await this.sendEmail(created, raw, orgName, roleName);
    } catch (err) {
      await this.repo.updateAsync({
        ...created, status: EOrganizationInvitationStatus.Failed,
        failureReason: err instanceof Error ? err.message : 'Mail delivery failed',
      });
      throw err;
    }
    const full = await this.repo.findWithRelationsAsync(created.id);
    if (!full) throw new NotFoundException('Invitation not found after creation');
    return this.toResponse(full);
  }

  private async sendEmail(invitation: OrganizationInvitation, raw: string, orgName: string, roleName: string): Promise<void> {
    const base = (this.config.get<string>('ERP_INVITE_WEB_URL') ?? 'http://localhost:5173/invitations').replace(/\/$/, '');
    await this.mail.sendInvitation({
      to: invitation.email, organizationName: orgName, roleName,
      inviteUrl: `${base}/${encodeURIComponent(raw)}`, expiresAt: invitation.expiresAt,
    });
  }

  private makeToken(): { raw: string; hash: string } {
    const raw = randomBytes(32).toString('base64url');
    return { raw, hash: createHash('sha256').update(raw).digest('hex') };
  }

  private toResponse(inv: OrganizationInvitation): OrganizationInvitationResponse {
    const r = new OrganizationInvitationResponse();
    r.id = inv.id; r.email = inv.email; r.firstName = inv.firstName; r.lastName = inv.lastName;
    r.organizationId = inv.organizationId; r.organizationName = inv.organizationName;
    r.roleId = inv.roleId; r.roleName = inv.roleName; r.locationId = inv.locationId;
    r.locationName = inv.locationName; r.status = inv.status; r.expiresAt = inv.expiresAt;
    r.lastSentAt = inv.lastSentAt; r.sendCount = inv.sendCount; r.createdAt = inv.createdAt;
    return r;
  }
}
