import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { createClerkClient } from '@clerk/backend';
import { passportJwtSecret } from 'jwks-rsa';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { ExtractJwt, SecretOrKeyProvider, Strategy } from 'passport-jwt';
import { In, Repository } from 'typeorm';
import { ICoreApiConfig } from '../../../configuration';
import { UserEntity, UserRoleEntity, OrgMemberEntity, LocationEntity, BranchEntity } from '../../../infrastructure/persistence/entities';
import { ERole } from '../../../infrastructure/persistence/entities/role.entity';
import { CLERK_STRATEGY, SESSION_INACTIVE_CODE } from '../constants';
import { AuthenticatedUser, ClerkJwtPayload } from '../types';

function inferIssuer(jwksUrl: string): string {
  return jwksUrl.replace(/\/\.well-known\/jwks\.json\/?$/, "").replace(/\/$/, "");
}

@Injectable()
export class ClerkJwtStrategy extends PassportStrategy(Strategy, CLERK_STRATEGY) {
  private readonly clerkClient: ReturnType<typeof createClerkClient>;

  constructor(
    private readonly configService: ConfigService<ICoreApiConfig>,
    @InjectRepository(UserEntity) private readonly userRepo: Repository<UserEntity>,
    @InjectRepository(UserRoleEntity) private readonly userRoleRepo: Repository<UserRoleEntity>,
    @InjectRepository(OrgMemberEntity) private readonly orgMemberRepo: Repository<OrgMemberEntity>,
    @InjectRepository(LocationEntity) private readonly locationRepo: Repository<LocationEntity>,
    @InjectRepository(BranchEntity) private readonly branchRepo: Repository<BranchEntity>,
    @InjectPinoLogger(ClerkJwtStrategy.name) private readonly logger: PinoLogger,
  ) {
    const clerkCfg = configService.get<ICoreApiConfig["clerk"]>("clerk");
    const issuer = clerkCfg.issuer || inferIssuer(clerkCfg.jwksUrl);
    if (!clerkCfg.jwksUrl || !issuer) {
      throw new Error("Clerk authentication requires CLERK_JWKS_URL and CLERK_ISSUER");
    }

    super({
      secretOrKeyProvider: passportJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 10,
        jwksUri: clerkCfg.jwksUrl,
      }),
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      algorithms: ["RS256"],
      issuer,
      audience: clerkCfg.audience,
      ignoreExpiration: false,
    });
    this.clerkClient = createClerkClient({ secretKey: clerkCfg.secretKey });
  }

  public async validate(payload: ClerkJwtPayload): Promise<AuthenticatedUser> {
    const clerkCfg = this.configService.get<ICoreApiConfig["clerk"]>("clerk");
    if (payload.azp && clerkCfg.authorizedParties.length > 0 && !clerkCfg.authorizedParties.includes(payload.azp)) {
      throw new UnauthorizedException("Token was issued for an unauthorized application");
    }
    const sessionStatus = payload.sts ?? "active";
    if (sessionStatus !== "active" && sessionStatus !== "pending") {
      this.logger.warn({ sts: sessionStatus, sub: payload.sub, sid: payload.sid }, "Rejected Clerk session with unsupported status");
      throw new UnauthorizedException({
        code: SESSION_INACTIVE_CODE,
        message: "Your session has ended. Please sign in again.",
      });
    }
    // "pending" is not an expired session: the user has an unfinished Clerk task (e.g. no active
    // organization). ClerkAuthGuard confines such sessions to @AllowPendingSession() endpoints.
    if (sessionStatus === "pending") {
      this.logger.warn({ sub: payload.sub, sid: payload.sid, org: payload.o?.id ?? null }, "Clerk session is pending");
    }

    const authUser = new AuthenticatedUser();
    authUser.sessionStatus = sessionStatus;
    authUser.clerkUserId = payload.sub;
    authUser.clerkSessionId = payload.sid;
    authUser.clerkOrgId = payload.o?.id;
    authUser.clerkOrgRole = payload.o?.rol;
    authUser.roles = [];
    authUser.locationIds = [];
    authUser.hasOrgWideAccess = false;

    if (payload.email) {
      authUser.email = payload.email;
      authUser.firstName = payload.firstName;
      authUser.lastName = payload.lastName;
      authUser.imageUrl = payload.imageUrl;
    } else {
      await this.enrichFromClerk(authUser, payload.sub);
    }

    if (!authUser.email) {
      throw new UnauthorizedException("Unable to resolve an email address for this Clerk account");
    }

    const dbUser = await this.userRepo.findOne({ where: { clerkUserId: payload.sub } });
    if (dbUser) {
      if (!dbUser.isActive) {
        throw new UnauthorizedException("User account is inactive");
      }
      authUser.dbUserId = dbUser.id;
      authUser.organizationId = dbUser.organizationId ?? undefined;

      const [userRoles, orgMembers, managedBranch] = await Promise.all([
        this.userRoleRepo.find({ where: { userId: dbUser.id }, relations: ['role'] }),
        this.orgMemberRepo.find({ where: { userId: dbUser.id, status: 'active' }, relations: ['role'] }),
        this.branchRepo.findOne({ where: { userId: dbUser.id, isActive: true } }),
      ]);

      const systemRoles = userRoles.map((ur) => ur.role?.name).filter(Boolean);
      const orgRoles = orgMembers.map((om) => om.role?.name).filter(Boolean);
      authUser.roles = [...new Set([...systemRoles, ...orgRoles])];

      const isAdministrator = authUser.roles.some((role) =>
        role === ERole.SuperAdmin || role === ERole.OrgAdmin);
      const hasExplicitOrganizationScope = userRoles.some((assignment) =>
        !assignment.locationId && assignment.role?.name !== ERole.BranchManager);

      if (isAdministrator || hasExplicitOrganizationScope) {
        authUser.hasOrgWideAccess = true;
      } else {
        const directLocationIds = userRoles
          .map((assignment) => assignment.locationId)
          .filter((id): id is string => Boolean(id));
        const activeDirectLocations = directLocationIds.length
          ? await this.locationRepo.find({
            where: {
              id: In(directLocationIds),
              organizationId: dbUser.organizationId,
              isActive: true,
            },
            select: ['id'],
          })
          : [];

        authUser.locationIds = activeDirectLocations.map((location) => location.id);
        authUser.hasOrgWideAccess = false;
      }

      if (managedBranch && !authUser.hasOrgWideAccess) {
        authUser.branchId = managedBranch.id;
        const branchLocs = await this.locationRepo.find({
          where: {
            branchId: managedBranch.id,
            organizationId: dbUser.organizationId,
            isActive: true,
          },
          select: ['id'],
        });
        authUser.locationIds = [...new Set([
          ...authUser.locationIds,
          ...branchLocs.map((location) => location.id),
        ])];
      }
    }

    return authUser;
  }

  private async enrichFromClerk(authUser: AuthenticatedUser, clerkUserId: string): Promise<void> {
    const clerkUser = await this.clerkClient.users.getUser(clerkUserId);
    const emails = clerkUser.emailAddresses;
    const chosen = emails.find((ea) => ea.id === clerkUser.primaryEmailAddressId) ?? emails.find((ea) => ea.verification?.status === "verified");
    authUser.email = chosen?.emailAddress;
    authUser.firstName = clerkUser.firstName ?? undefined;
    authUser.lastName = clerkUser.lastName ?? undefined;
    authUser.imageUrl = clerkUser.imageUrl ?? undefined;
  }
}
