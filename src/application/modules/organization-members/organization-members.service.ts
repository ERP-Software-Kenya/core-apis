import { BadRequestException, ConflictException, ForbiddenException, GoneException, Injectable, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { createHash, randomBytes } from 'crypto';
import { DataSource, Repository } from 'typeorm';
import { AuthenticatedUser } from '../../../common';
import {
  EOrganizationInvitationStatus, ERole, LocationEntity, OrganizationEntity,
  OrganizationInvitationEntity, OrgMemberEntity, RoleEntity, UserEntity, UserRoleEntity,
} from '../../../infrastructure';
import {
  CreateOrganizationInvitationRequest, OrganizationInvitationResponse, OrganizationMemberResponse,
  PublicOrganizationInvitationResponse, UpdateOrganizationMemberRequest,
} from './models';
import { OrganizationInvitationMailService } from './organization-invitation-mail.service';

@Injectable()
export class OrganizationMembersService {
  constructor(
    @InjectRepository(OrganizationInvitationEntity) private readonly invitations: Repository<OrganizationInvitationEntity>,
    @InjectRepository(OrgMemberEntity) private readonly members: Repository<OrgMemberEntity>,
    @InjectRepository(UserEntity) private readonly users: Repository<UserEntity>,
    @InjectRepository(RoleEntity) private readonly roles: Repository<RoleEntity>,
    @InjectRepository(LocationEntity) private readonly locations: Repository<LocationEntity>,
    @InjectRepository(OrganizationEntity) private readonly organizations: Repository<OrganizationEntity>,
    @InjectDataSource() private readonly dataSource: DataSource,
    private readonly config: ConfigService,
    private readonly mail: OrganizationInvitationMailService,
  ) {}

  public async create(current: AuthenticatedUser, body: CreateOrganizationInvitationRequest): Promise<OrganizationInvitationResponse> {
    const organizationId = this.resolveAdminOrganization(current, body.organizationId);
    const invitedByUserId = this.requireDbUser(current);
    const emailNormalized = this.normalizeEmail(body.email);
    const [organization, role, location, existingUser, pending] = await Promise.all([
      this.organizations.findOneBy({ id: organizationId }),
      this.roles.findOneBy({ id: body.roleId }),
      body.locationId ? this.locations.findOneBy({ id: body.locationId }) : Promise.resolve(null),
      this.users.createQueryBuilder('user').where('LOWER(user.email) = :email', { email: emailNormalized }).getOne(),
      this.invitations.findOne({ where: { organizationId, emailNormalized, status: EOrganizationInvitationStatus.Pending } }),
    ]);
    if (!organization) throw new NotFoundException('Organization not found');
    this.validateRole(role);
    if (location && location.organizationId !== organizationId) throw new ForbiddenException('Location does not belong to this organization');
    if (body.locationId && !location) throw new NotFoundException('Location not found');
    if (existingUser?.organizationId === organizationId) throw new ConflictException('User is already a member of this organization');
    if (existingUser?.organizationId && existingUser.organizationId !== organizationId) {
      throw new ConflictException('User already belongs to another organization');
    }
    if (pending) throw new ConflictException('A pending invitation already exists for this email');

    const { raw, hash } = this.makeToken();
    const now = new Date();
    const entity = this.invitations.create({
      organizationId, email: body.email.trim(), emailNormalized, firstName: body.firstName?.trim() || undefined,
      lastName: body.lastName?.trim() || undefined, roleId: body.roleId, locationId: body.locationId,
      invitedByUserId, tokenHash: hash, status: EOrganizationInvitationStatus.Pending,
      expiresAt: this.expiryFrom(now), lastSentAt: now, sendCount: 1,
    });
    const saved = await this.invitations.save(entity);
    try {
      await this.send(saved, raw, organization.name, role!.name);
    } catch (error) {
      saved.status = EOrganizationInvitationStatus.Failed;
      saved.failureReason = error instanceof Error ? error.message : 'Mail delivery failed';
      await this.invitations.save(saved);
      throw error;
    }
    return this.toInvitationResponse(await this.getDetailed(saved.id));
  }

  public async list(current: AuthenticatedUser, requestedOrganizationId?: string): Promise<OrganizationInvitationResponse[]> {
    const organizationId = this.resolveAdminOrganization(current, requestedOrganizationId);
    await this.expirePending(organizationId);
    const rows = await this.invitations.find({
      where: { organizationId }, relations: { organization: true, role: true, location: true },
      order: { createdAt: 'DESC' },
    });
    return rows.map((row) => this.toInvitationResponse(row));
  }

  public async validatePublic(rawToken: string): Promise<PublicOrganizationInvitationResponse> {
    const invitation = await this.findByRawToken(rawToken);
    await this.expireIfNeeded(invitation);
    this.assertUsable(invitation);
    const scheme = this.config.get<string>('ERP_APP_SCHEME') || 'erpapp';
    return {
      organizationName: invitation.organization.name,
      invitedEmailMasked: this.maskEmail(invitation.emailNormalized), roleName: invitation.role.name,
      status: invitation.status, expiresAt: invitation.expiresAt,
      appLink: `${scheme}://invite/${encodeURIComponent(rawToken)}`,
      androidInstallUrl: this.config.get<string>('ERP_ANDROID_INSTALL_URL'),
      iosInstallUrl: this.config.get<string>('ERP_IOS_INSTALL_URL'),
      desktopInstallUrl: this.config.get<string>('ERP_DESKTOP_INSTALL_URL'),
    };
  }

  public async accept(current: AuthenticatedUser, rawToken: string): Promise<{ organization: { id: string; name: string }; membership: { id: string; status: string; role: string; locationIds: string[] } }> {
    const authenticatedEmail = this.normalizeEmail(current.email || '');
    if (!authenticatedEmail) throw new BadRequestException('Authenticated account has no verified email');
    const tokenHash = this.hashToken(rawToken);
    await this.invitations.createQueryBuilder().update().set({ status: EOrganizationInvitationStatus.Expired })
      .where('token_hash = :tokenHash', { tokenHash }).andWhere('status = :status', { status: EOrganizationInvitationStatus.Pending })
      .andWhere('expires_at <= NOW()').execute();
    return this.dataSource.transaction(async (manager) => {
      const invitation = await manager.findOne(OrganizationInvitationEntity, {
        where: { tokenHash }, relations: { organization: true, role: true }, lock: { mode: 'pessimistic_write' },
      });
      if (!invitation) throw new NotFoundException('Invitation not found');
      if (invitation.emailNormalized !== authenticatedEmail) throw new ForbiddenException({ code: 'INVITATION_EMAIL_MISMATCH', message: `Sign in using ${invitation.email} to accept this invitation` });

      let user = await manager.findOne(UserEntity, { where: [{ clerkUserId: current.clerkUserId }, { email: authenticatedEmail }] });
      if (invitation.status === EOrganizationInvitationStatus.Accepted && user && invitation.acceptedByUserId === user.id) {
        const member = await manager.findOneByOrFail(OrgMemberEntity, { userId: user.id, organizationId: invitation.organizationId });
        return this.acceptResponse(invitation, member);
      }
      this.assertUsable(invitation);
      if (user?.organizationId && user.organizationId !== invitation.organizationId) throw new ConflictException('User already belongs to another organization');
      if (!user) {
        user = manager.create(UserEntity, {
          clerkUserId: current.clerkUserId, email: authenticatedEmail,
          firstName: current.firstName ?? invitation.firstName, lastName: current.lastName ?? invitation.lastName,
          avatarUrl: current.imageUrl, isActive: true, organizationId: invitation.organizationId,
        });
      } else {
        user.clerkUserId = current.clerkUserId;
        user.organizationId = invitation.organizationId;
        user.isActive = true;
        user.firstName = current.firstName ?? user.firstName ?? invitation.firstName;
        user.lastName = current.lastName ?? user.lastName ?? invitation.lastName;
      }
      user = await manager.save(UserEntity, user);
      let member = await manager.findOne(OrgMemberEntity, { where: { userId: user.id, organizationId: invitation.organizationId } });
      if (!member) member = manager.create(OrgMemberEntity, { organizationId: invitation.organizationId, userId: user.id, roleId: invitation.roleId, invitedById: invitation.invitedByUserId, status: 'active', joinedAt: new Date() });
      else { member.roleId = invitation.roleId; member.status = 'active'; }
      member = await manager.save(OrgMemberEntity, member);
      let userRole = await manager.findOne(UserRoleEntity, { where: { userId: user.id } });
      if (!userRole) userRole = manager.create(UserRoleEntity, { userId: user.id, roleId: invitation.roleId, locationId: invitation.locationId });
      else { userRole.roleId = invitation.roleId; userRole.locationId = invitation.locationId; }
      await manager.save(UserRoleEntity, userRole);
      invitation.status = EOrganizationInvitationStatus.Accepted;
      invitation.acceptedAt = new Date(); invitation.acceptedByUserId = user.id; invitation.failureReason = undefined;
      await manager.save(OrganizationInvitationEntity, invitation);
      return this.acceptResponse(invitation, member);
    });
  }

  public async resend(current: AuthenticatedUser, id: string): Promise<OrganizationInvitationResponse> {
    const invitation = await this.getDetailed(id);
    this.assertCanManage(current, invitation.organizationId);
    if (invitation.status === EOrganizationInvitationStatus.Accepted || invitation.status === EOrganizationInvitationStatus.Revoked) throw new ConflictException('Invitation cannot be resent');
    const { raw, hash } = this.makeToken();
    invitation.tokenHash = hash; invitation.status = EOrganizationInvitationStatus.Pending;
    invitation.expiresAt = this.expiryFrom(new Date()); invitation.lastSentAt = new Date();
    invitation.sendCount += 1; invitation.failureReason = undefined;
    await this.invitations.save(invitation);
    try { await this.send(invitation, raw, invitation.organization.name, invitation.role.name); }
    catch (error) { invitation.status = EOrganizationInvitationStatus.Failed; invitation.failureReason = error instanceof Error ? error.message : 'Mail delivery failed'; await this.invitations.save(invitation); throw error; }
    return this.toInvitationResponse(invitation);
  }

  public async revoke(current: AuthenticatedUser, id: string): Promise<void> {
    const invitation = await this.invitations.findOneBy({ id });
    if (!invitation) throw new NotFoundException('Invitation not found');
    this.assertCanManage(current, invitation.organizationId);
    if (invitation.status === EOrganizationInvitationStatus.Accepted) throw new ConflictException('Accepted invitation cannot be revoked');
    invitation.status = EOrganizationInvitationStatus.Revoked; invitation.revokedAt = new Date(); invitation.revokedByUserId = this.requireDbUser(current);
    await this.invitations.save(invitation);
  }

  public async listMembers(current: AuthenticatedUser, requestedOrganizationId?: string): Promise<OrganizationMemberResponse[]> {
    const organizationId = this.resolveAdminOrganization(current, requestedOrganizationId);
    const rows = await this.members.find({ where: { organizationId }, relations: { user: { userRoles: { role: true, location: true } }, role: true }, order: { joinedAt: 'DESC' } });
    return rows.map((member) => { const ur = member.user?.userRoles?.[0]; return { id: member.id, userId: member.userId, email: member.user?.email ?? '', firstName: member.user?.firstName, lastName: member.user?.lastName, roleId: member.roleId, roleName: member.role?.name ?? ur?.role?.name ?? '', locationId: ur?.locationId, locationName: ur?.location?.name, status: member.status, joinedAt: member.joinedAt }; });
  }

  public async updateMember(current: AuthenticatedUser, id: string, body: UpdateOrganizationMemberRequest): Promise<OrganizationMemberResponse> {
    const member = await this.members.findOne({ where: { id }, relations: { user: true } });
    if (!member) throw new NotFoundException('Member not found');
    this.assertCanManage(current, member.organizationId);
    if (body.roleId) this.validateRole(await this.roles.findOneBy({ id: body.roleId }));
    if (body.locationId) { const location = await this.locations.findOneBy({ id: body.locationId }); if (!location || location.organizationId !== member.organizationId) throw new ForbiddenException('Location does not belong to this organization'); }
    await this.dataSource.transaction(async (manager) => {
      if (body.roleId) member.roleId = body.roleId;
      if (body.status) { member.status = body.status; member.user.isActive = body.status === 'active'; await manager.save(UserEntity, member.user); }
      await manager.save(OrgMemberEntity, member);
      let ur = await manager.findOne(UserRoleEntity, { where: { userId: member.userId } });
      if (!ur) ur = manager.create(UserRoleEntity, { userId: member.userId, roleId: body.roleId ?? member.roleId, locationId: body.locationId });
      else { if (body.roleId) ur.roleId = body.roleId; if (body.locationId !== undefined) ur.locationId = body.locationId ?? (null as unknown as string); }
      await manager.save(UserRoleEntity, ur);
    });
    return (await this.listMembers(current, member.organizationId)).find((row) => row.id === id)!;
  }

  public async removeMember(current: AuthenticatedUser, id: string): Promise<void> {
    const member = await this.members.findOne({ where: { id }, relations: { user: true } });
    if (!member) throw new NotFoundException('Member not found');
    this.assertCanManage(current, member.organizationId);
    if (member.userId === current.dbUserId) throw new ConflictException('You cannot remove yourself');
    await this.dataSource.transaction(async (manager) => {
      await manager.delete(UserRoleEntity, { userId: member.userId });
      member.status = 'removed'; await manager.save(OrgMemberEntity, member);
      // Removing ERP access is not an identity ban. Keeping the identity active
      // allows the same Clerk account to accept a future invitation.
      member.user.organizationId = null as unknown as string; member.user.isActive = true; await manager.save(UserEntity, member.user);
    });
  }

  private resolveAdminOrganization(current: AuthenticatedUser, requested?: string): string {
    if (current.roles.includes(ERole.SuperAdmin)) { if (!requested && !current.organizationId) throw new BadRequestException('Organization is required'); return requested ?? current.organizationId!; }
    if (!current.organizationId) throw new ForbiddenException('No organization assigned');
    return current.organizationId;
  }
  private requireDbUser(current: AuthenticatedUser): string { if (!current.dbUserId) throw new ForbiddenException('Sync your account before managing invitations'); return current.dbUserId; }
  private assertCanManage(current: AuthenticatedUser, organizationId: string): void { if (!current.roles.includes(ERole.SuperAdmin) && current.organizationId !== organizationId) throw new ForbiddenException('Resource belongs to another organization'); }
  private validateRole(role: RoleEntity | null): void { if (!role) throw new NotFoundException('Role not found'); if (role.name === ERole.SuperAdmin) throw new ForbiddenException('SuperAdmin cannot be invited'); }
  private normalizeEmail(value: string): string { return value.trim().toLowerCase(); }
  private hashToken(raw: string): string { return createHash('sha256').update(raw).digest('hex'); }
  private makeToken(): { raw: string; hash: string } { const raw = randomBytes(32).toString('base64url'); return { raw, hash: this.hashToken(raw) }; }
  private expiryFrom(now: Date): Date { const hours = Number(this.config.get<string>('ERP_INVITE_EXPIRY_HOURS') || '72'); return new Date(now.getTime() + hours * 3_600_000); }
  private async send(invitation: OrganizationInvitationEntity, raw: string, organizationName: string, roleName: string): Promise<void> { const base = (this.config.get<string>('ERP_INVITE_WEB_URL') || 'http://localhost:5173/invitations').replace(/\/$/, ''); await this.mail.sendInvitation({ to: invitation.email, organizationName, roleName, inviteUrl: `${base}/${encodeURIComponent(raw)}`, expiresAt: invitation.expiresAt }); }
  private async getDetailed(id: string): Promise<OrganizationInvitationEntity> { const row = await this.invitations.findOne({ where: { id }, relations: { organization: true, role: true, location: true } }); if (!row) throw new NotFoundException('Invitation not found'); return row; }
  private async findByRawToken(raw: string): Promise<OrganizationInvitationEntity> { const row = await this.invitations.findOne({ where: { tokenHash: this.hashToken(raw) }, relations: { organization: true, role: true, location: true } }); if (!row) throw new NotFoundException('Invitation not found'); return row; }
  private async expireIfNeeded(invitation: OrganizationInvitationEntity): Promise<void> { if (invitation.status === EOrganizationInvitationStatus.Pending && invitation.expiresAt <= new Date()) { invitation.status = EOrganizationInvitationStatus.Expired; await this.invitations.save(invitation); } }
  private assertUsable(invitation: OrganizationInvitationEntity): void { if (invitation.status === EOrganizationInvitationStatus.Expired) throw new GoneException({ code: 'INVITATION_EXPIRED', message: 'Invitation has expired' }); if (invitation.status === EOrganizationInvitationStatus.Revoked) throw new GoneException({ code: 'INVITATION_REVOKED', message: 'Invitation was revoked' }); if (invitation.status === EOrganizationInvitationStatus.Failed) throw new ConflictException({ code: 'INVITATION_DELIVERY_FAILED', message: 'Invitation delivery failed; request a resend' }); if (invitation.status !== EOrganizationInvitationStatus.Pending && invitation.status !== EOrganizationInvitationStatus.Accepted) throw new ConflictException({ code: 'INVITATION_UNAVAILABLE', message: 'Invitation is not available' }); }
  private async expirePending(organizationId: string): Promise<void> { await this.invitations.createQueryBuilder().update().set({ status: EOrganizationInvitationStatus.Expired }).where('organization_id = :organizationId', { organizationId }).andWhere('status = :status', { status: EOrganizationInvitationStatus.Pending }).andWhere('expires_at <= NOW()').execute(); }
  private maskEmail(email: string): string { const [name, domain] = email.split('@'); return `${name.slice(0, 1)}${'*'.repeat(Math.max(2, name.length - 1))}@${domain}`; }
  private toInvitationResponse(row: OrganizationInvitationEntity): OrganizationInvitationResponse { return { id: row.id, email: row.email, firstName: row.firstName, lastName: row.lastName, organizationId: row.organizationId, organizationName: row.organization?.name ?? '', roleId: row.roleId, roleName: row.role?.name ?? '', locationId: row.locationId, locationName: row.location?.name, status: row.status, expiresAt: row.expiresAt, lastSentAt: row.lastSentAt, sendCount: row.sendCount, createdAt: row.createdAt }; }
  private acceptResponse(invitation: OrganizationInvitationEntity, member: OrgMemberEntity) { return { organization: { id: invitation.organizationId, name: invitation.organization.name }, membership: { id: member.id, status: member.status, role: invitation.role.name, locationIds: invitation.locationId ? [invitation.locationId] : [] } }; }
}
