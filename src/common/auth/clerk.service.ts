import { Injectable, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createClerkClient } from '@clerk/backend';
import { ICoreApiConfig } from '../../configuration';
import { EInvitationStatus } from '../../infrastructure/e-invitation-status';
import { ClerkInvitationData, ClerkUserData, ClerkUserListData, IClerkService } from './i-clerk.service';

@Injectable()
export class ClerkService implements IClerkService {
  private readonly client: ReturnType<typeof createClerkClient>;

  constructor(config: ConfigService<ICoreApiConfig>) {
    const clerkCfg = config.get<ICoreApiConfig['clerk']>('clerk');
    this.client = createClerkClient({ secretKey: clerkCfg.secretKey });
  }

  public async getTokenForUser(userId: string): Promise<string> {
    const result = await this.client.sessions.getSessionList({ userId, status: 'active' });
    if (!result.data.length) {
      throw new NotFoundException(`No active session found for user ${userId}`);
    }
    const tokenResult = await this.client.sessions.getToken(result.data[0].id);
    return tokenResult.jwt;
  }

  public async listUsersAsync(params?: { limit?: number; offset?: number; organizationId?: string }): Promise<ClerkUserListData> {
    const result = await this.client.users.getUserList({
      limit:          params?.limit  ?? 20,
      offset:         params?.offset ?? 0,
      organizationId: params?.organizationId ? [params.organizationId] : undefined,
    });
    return {
      data:       result.data.map((u) => this.mapUser(u)),
      totalCount: result.totalCount,
    };
  }

  public async searchUsersAsync(params: { query: string; limit?: number; offset?: number }): Promise<ClerkUserListData> {
    const result = await this.client.users.getUserList({
      query:  params.query,
      limit:  params.limit  ?? 20,
      offset: params.offset ?? 0,
    });
    return {
      data:       result.data.map((u) => this.mapUser(u)),
      totalCount: result.totalCount,
    };
  }

  public async getClerkUserAsync(clerkUserId: string): Promise<ClerkUserData> {
    const user = await this.client.users.getUser(clerkUserId);
    return this.mapUser(user);
  }

  public async getUserRolesAsync(clerkUserId: string): Promise<string[]> {
    const user = await this.client.users.getUser(clerkUserId);
    const meta = user.publicMetadata as Record<string, unknown>;
    return Array.isArray(meta['roles']) ? (meta['roles'] as string[]) : [];
  }

  public async updateUserRolesAsync(clerkUserId: string, roles: string[]): Promise<void> {
    await this.client.users.updateUserMetadata(clerkUserId, {
      publicMetadata: { roles },
    });
  }

  public async inviteUserAsync(params: { email: string; roles?: string[]; redirectUrl?: string }): Promise<void> {
    await this.client.invitations.createInvitation({
      emailAddress:   params.email,
      redirectUrl:    params.redirectUrl,
      publicMetadata: params.roles?.length ? { roles: params.roles } : undefined,
      ignoreExisting: true,
    });
  }

  public async listInvitationsAsync(params?: { status?: EInvitationStatus }): Promise<ClerkInvitationData[]> {
    const result = await this.client.invitations.getInvitationList({
      status: params?.status,
    });
    return result.data.map((inv) => {
      const meta  = inv.publicMetadata as Record<string, unknown>;
      const roles = Array.isArray(meta['roles']) ? (meta['roles'] as string[]) : undefined;
      return {
        id:           inv.id,
        emailAddress: inv.emailAddress,
        status:       inv.status as EInvitationStatus,
        roles,
        createdAt:    inv.createdAt,
        updatedAt:    inv.updatedAt,
      };
    });
  }

  public async revokeInvitationAsync(invitationId: string): Promise<void> {
    await this.client.invitations.revokeInvitation(invitationId);
  }

  public async deleteClerkUserAsync(clerkUserId: string): Promise<void> {
    await this.client.users.deleteUser(clerkUserId);
  }

  public async banClerkUserAsync(clerkUserId: string): Promise<void> {
    await this.client.users.banUser(clerkUserId);
  }

  public async unbanClerkUserAsync(clerkUserId: string): Promise<void> {
    await this.client.users.unbanUser(clerkUserId);
  }

  public async assignToOrganizationAsync(params: { clerkUserId: string; organizationId: string; role: string }): Promise<void> {
    await this.client.organizations.createOrganizationMembership({
      organizationId: params.organizationId,
      userId:         params.clerkUserId,
      role:           params.role,
    });
  }

  public async removeFromOrganizationAsync(params: { clerkUserId: string; organizationId: string }): Promise<void> {
    await this.client.organizations.deleteOrganizationMembership({
      organizationId: params.organizationId,
      userId:         params.clerkUserId,
    });
  }

  private mapUser(user: Awaited<ReturnType<(typeof this.client.users)['getUser']>>): ClerkUserData {
    const meta       = user.publicMetadata as Record<string, unknown>;
    const roles      = Array.isArray(meta['roles']) ? (meta['roles'] as string[]) : [];
    const primaryEmail = user.emailAddresses.find((e) => e.id === user.primaryEmailAddressId);

    return {
      clerkUserId:  user.id,
      email:        primaryEmail?.emailAddress ?? '',
      firstName:    user.firstName,
      lastName:     user.lastName,
      imageUrl:     user.imageUrl,
      banned:       user.banned,
      roles,
      createdAt:    user.createdAt,
      lastSignInAt: user.lastSignInAt ?? null,
    };
  }
}
