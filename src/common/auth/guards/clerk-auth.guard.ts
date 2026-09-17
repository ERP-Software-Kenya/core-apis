import { ExecutionContext, Inject, Injectable, Logger, Optional, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { DataSource } from 'typeorm';
import { CLERK_STRATEGY } from '../constants';
import { shouldAllowAnonymous } from './should-allow-anonymous';
import { AuthenticatedUser } from '../types';
import {
  UserEntity,
  UserRoleEntity,
  OrgMemberEntity,
  BranchEntity,
  LocationEntity,
  ERole,
} from '../../../infrastructure/persistence/entities';
import { isDev, isLocal, isTest } from '../../tools';

@Injectable()
export class ClerkAuthGuard extends AuthGuard(CLERK_STRATEGY) {
  private readonly logger = new Logger(ClerkAuthGuard.name);
  private cachedUser: AuthenticatedUser | null = null;
  private cacheExpiresAt = 0;

  constructor(
    private readonly reflector: Reflector,
    @Optional() @Inject(DataSource) private readonly dataSource?: DataSource,
  ) {
    super();
  }

  private isDevAuthBypass(): boolean {
    const isDevEnv =
      process.env.NODE_ENV === 'development' ||
      !process.env.NODE_ENV ||
      isDev() ||
      isLocal() ||
      isTest();
    return isDevEnv && process.env.DEV_AUTH_BYPASS === 'true';
  }

  private async resolveDevUser(): Promise<AuthenticatedUser | null> {
    if (!this.dataSource || !this.dataSource.isInitialized) {
      return null;
    }

    const now = Date.now();
    if (this.cachedUser && now < this.cacheExpiresAt) {
      return this.cachedUser;
    }

    try {
      const userRepo = this.dataSource.getRepository(UserEntity);
      const userRoleRepo = this.dataSource.getRepository(UserRoleEntity);
      const orgMemberRepo = this.dataSource.getRepository(OrgMemberEntity);
      const branchRepo = this.dataSource.getRepository(BranchEntity);
      const locationRepo = this.dataSource.getRepository(LocationEntity);

      const dbUser = await userRepo.findOne({
        where: { isActive: true },
        order: { createdAt: 'DESC' },
      });

      if (!dbUser) {
        return null;
      }

      const clerkUserId = dbUser.clerkUserId || `dev_clerk_${dbUser.id}`;
      if (!dbUser.clerkUserId) {
        await userRepo.update(dbUser.id, { clerkUserId });
        dbUser.clerkUserId = clerkUserId;
      }

      const authUser = new AuthenticatedUser();
      authUser.clerkUserId = clerkUserId;
      authUser.dbUserId = dbUser.id;
      authUser.email = dbUser.email;
      authUser.firstName = dbUser.firstName;
      authUser.lastName = dbUser.lastName;
      authUser.imageUrl = dbUser.avatarUrl;
      authUser.organizationId = dbUser.organizationId ?? undefined;

      const [userRoles, orgMembers, managedBranch] = await Promise.all([
        userRoleRepo.find({ where: { userId: dbUser.id }, relations: ['role'] }),
        orgMemberRepo.find({ where: { userId: dbUser.id }, relations: ['role'] }),
        branchRepo.findOne({ where: { userId: dbUser.id } }),
      ]);

      const systemRoles = userRoles.map((ur) => ur.role?.name).filter(Boolean) as ERole[];
      const orgRoles = orgMembers.map((om) => om.role?.name).filter(Boolean) as ERole[];
      const roles = [...new Set([...systemRoles, ...orgRoles])];
      authUser.roles = roles.length > 0 ? roles : [ERole.SuperAdmin, ERole.OrgAdmin];

      if (managedBranch) {
        authUser.branchId = managedBranch.id;
        const branchLocs = await locationRepo.find({
          where: { branch: { id: managedBranch.id } },
          select: ['id'],
        });
        authUser.locationIds = branchLocs.map((l) => l.id);
        authUser.hasOrgWideAccess = false;
      } else {
        authUser.hasOrgWideAccess = true;
        authUser.locationIds = [];
      }

      this.cachedUser = authUser;
      this.cacheExpiresAt = now + 3000; // cache for 3s
      return authUser;
    } catch (err) {
      this.logger.warn(`Dev auth bypass failed to resolve user: ${(err as Error).message}`);
      return null;
    }
  }

  public override handleRequest<TUser>(err: Error, user: TUser, info: unknown): TUser {
    if (this.isDevAuthBypass() && user) {
      return user;
    }
    if (err || !user) {
      const reason = err?.message ?? (info instanceof Error ? info.message : String(info ?? 'no info'));
      this.logger.warn(`JWT auth failed — ${reason}`);
      throw err || new UnauthorizedException('Invalid or missing Clerk session token');
    }
    return user;
  }

  public override async canActivate(context: ExecutionContext): Promise<boolean> {
    if (shouldAllowAnonymous(context, this.reflector)) {
      return true;
    }

    if (this.isDevAuthBypass()) {
      const devUser = await this.resolveDevUser();
      if (devUser) {
        const req = context.switchToHttp().getRequest();
        req.user = devUser;
        return true;
      }
    }

    return super.canActivate(context) as Promise<boolean>;
  }
}
