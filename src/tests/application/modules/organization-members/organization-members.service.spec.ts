import { ForbiddenException } from '@nestjs/common';
jest.mock('@automapper/classes', () => ({ AutoMap: () => () => undefined }));
jest.mock('../../../../infrastructure', () => ({
  EOrganizationInvitationStatus: { Pending: 'pending', Accepted: 'accepted', Expired: 'expired', Revoked: 'revoked', Failed: 'failed' },
  ERole: { SuperAdmin: 'super_admin', OrgAdmin: 'org_admin', Packer: 'packer', Driver: 'driver', BranchManager: 'branch_manager' },
  OrganizationInvitationEntity: class OrganizationInvitationEntity {},
  OrgMemberEntity: class OrgMemberEntity {}, UserEntity: class UserEntity {}, UserRoleEntity: class UserRoleEntity {},
  LocationEntity: class LocationEntity {}, OrganizationEntity: class OrganizationEntity {}, RoleEntity: class RoleEntity {},
}));
jest.mock('../../../../common', () => ({ AuthenticatedUser: class AuthenticatedUser {} }));
jest.mock('../../../../application/modules/organization-members/organization-invitation-mail.service', () => ({ OrganizationInvitationMailService: class OrganizationInvitationMailService {} }));
import { EOrganizationInvitationStatus, ERole, OrganizationInvitationEntity, OrgMemberEntity, UserEntity, UserRoleEntity } from '../../../../infrastructure';
import { OrganizationMembersService } from '../../../../application/modules/organization-members/organization-members.service';

function repository() {
  const queryBuilder = {
    where: jest.fn().mockReturnThis(), andWhere: jest.fn().mockReturnThis(), getOne: jest.fn(),
    update: jest.fn().mockReturnThis(), set: jest.fn().mockReturnThis(), execute: jest.fn().mockResolvedValue({}),
  };
  return {
    findOne: jest.fn(), findOneBy: jest.fn(), find: jest.fn(), create: jest.fn((value) => value),
    save: jest.fn(async (value) => value), delete: jest.fn(),
    createQueryBuilder: jest.fn(() => queryBuilder),
  };
}

function makeService() {
  const invitations = repository();
  const members = repository();
  const users = repository();
  const roles = repository();
  const locations = repository();
  const organizations = repository();
  const dataSource = { transaction: jest.fn() };
  const config = { get: jest.fn((key: string) => key === 'ERP_INVITE_WEB_URL' ? 'https://invite.example/invitations' : undefined) };
  const mail = { sendInvitation: jest.fn().mockResolvedValue(undefined) };
  const service = new OrganizationMembersService(
    invitations as never, members as never, users as never, roles as never, locations as never,
    organizations as never, dataSource as never, config as never, mail as never,
  );
  return { service, invitations, members, users, roles, locations, organizations, dataSource, mail };
}

const admin = { dbUserId: 'admin-1', organizationId: 'org-1', clerkUserId: 'clerk-admin', roles: [ERole.OrgAdmin] } as never;

describe('OrganizationMembersService', () => {
  it('always scopes an organization admin invitation to the caller organization', async () => {
    const ctx = makeService();
    ctx.organizations.findOneBy.mockResolvedValue({ id: 'org-1', name: 'Acme' });
    ctx.roles.findOneBy.mockResolvedValue({ id: 'role-1', name: ERole.Packer });
    ctx.users.createQueryBuilder().getOne.mockResolvedValue(null);
    ctx.invitations.findOne
      .mockResolvedValueOnce(null)
      .mockResolvedValueOnce({
        id: 'invite-1', organizationId: 'org-1', organization: { name: 'Acme' }, email: 'new@example.com',
        emailNormalized: 'new@example.com', roleId: 'role-1', role: { name: ERole.Packer },
        status: EOrganizationInvitationStatus.Pending, expiresAt: new Date(), lastSentAt: new Date(), sendCount: 1, createdAt: new Date(),
      });
    ctx.invitations.save.mockImplementation(async (value) => ({ id: 'invite-1', createdAt: new Date(), ...value }));

    const result = await ctx.service.create(admin, { email: ' New@Example.com ', roleId: 'role-1', organizationId: 'org-other' });

    expect(ctx.invitations.create).toHaveBeenCalledWith(expect.objectContaining({ organizationId: 'org-1', emailNormalized: 'new@example.com' }));
    expect(ctx.mail.sendInvitation).toHaveBeenCalledWith(expect.objectContaining({ organizationName: 'Acme', to: 'New@Example.com' }));
    expect(result.organizationId).toBe('org-1');
  });

  it('rejects a location owned by a different organization', async () => {
    const ctx = makeService();
    ctx.organizations.findOneBy.mockResolvedValue({ id: 'org-1', name: 'Acme' });
    ctx.roles.findOneBy.mockResolvedValue({ id: 'role-1', name: ERole.Packer });
    ctx.locations.findOneBy.mockResolvedValue({ id: 'loc-2', organizationId: 'org-2' });
    ctx.users.createQueryBuilder().getOne.mockResolvedValue(null);
    await expect(ctx.service.create(admin, { email: 'new@example.com', roleId: 'role-1', locationId: 'loc-2' })).rejects.toBeInstanceOf(ForbiddenException);
  });

  it('accepts a pending invitation atomically and creates local membership without a Clerk organization', async () => {
    const ctx = makeService();
    const invitation = {
      id: 'invite-1', tokenHash: 'hash', organizationId: 'org-1', organization: { id: 'org-1', name: 'Acme' },
      email: 'new@example.com', emailNormalized: 'new@example.com', roleId: 'role-1', role: { name: ERole.Packer },
      locationId: 'loc-1', invitedByUserId: 'admin-1', status: EOrganizationInvitationStatus.Pending,
      expiresAt: new Date(Date.now() + 60_000),
    };
    const manager = {
      findOne: jest.fn(async (entity) => {
        if (entity === OrganizationInvitationEntity) return invitation;
        if (entity === UserEntity || entity === OrgMemberEntity || entity === UserRoleEntity) return null;
        return null;
      }),
      create: jest.fn((_entity, value) => value),
      save: jest.fn(async (entity, value) => {
        if (entity === UserEntity) return { id: 'user-1', ...value };
        if (entity === OrgMemberEntity) return { id: 'member-1', ...value };
        return value;
      }),
    };
    ctx.dataSource.transaction.mockImplementation(async (callback) => callback(manager));

    const result = await ctx.service.accept({ clerkUserId: 'clerk-1', email: 'new@example.com', roles: [] } as never, 'raw-token');

    expect(manager.save).toHaveBeenCalledWith(OrgMemberEntity, expect.objectContaining({ organizationId: 'org-1', status: 'active' }));
    expect(manager.save).toHaveBeenCalledWith(UserRoleEntity, expect.objectContaining({ roleId: 'role-1', locationId: 'loc-1' }));
    expect(result.membership.id).toBe('member-1');
  });
});
