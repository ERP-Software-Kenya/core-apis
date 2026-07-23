import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { createClerkClient } from '@clerk/backend';
import { passportJwtSecret } from 'jwks-rsa';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Repository } from 'typeorm';
import { ICoreApiConfig } from '../../../configuration';
import { UserEntity, UserRoleEntity, OrgMemberEntity } from '../../../infrastructure/persistence/entities';
import { CLERK_STRATEGY } from '../constants';
import { AuthenticatedUser, ClerkJwtPayload } from '../types';

@Injectable()
export class ClerkJwtStrategy extends PassportStrategy(Strategy, CLERK_STRATEGY) {
  private readonly clerkClient: ReturnType<typeof createClerkClient>;

  constructor(
    configService: ConfigService<ICoreApiConfig>,
    @InjectRepository(UserEntity) private readonly userRepo: Repository<UserEntity>,
    @InjectRepository(UserRoleEntity) private readonly userRoleRepo: Repository<UserRoleEntity>,
    @InjectRepository(OrgMemberEntity) private readonly orgMemberRepo: Repository<OrgMemberEntity>,
    @InjectPinoLogger(ClerkJwtStrategy.name) private readonly logger: PinoLogger,
  ) {
    const clerkCfg = configService.get<ICoreApiConfig['clerk']>('clerk');
    super({
      secretOrKeyProvider: passportJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 10,
        jwksUri: clerkCfg.jwksUrl,
      }),
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      algorithms: ['RS256'],
      ignoreExpiration: false,
    });
    this.clerkClient = createClerkClient({ secretKey: clerkCfg.secretKey });
  }

  public async validate(payload: ClerkJwtPayload): Promise<AuthenticatedUser> {
    const authUser = new AuthenticatedUser();
    authUser.clerkUserId = payload.sub;
    authUser.clerkOrgId = payload.o?.id;
    authUser.clerkOrgRole = payload.o?.rol;
    authUser.roles = [];

    if (payload.email) {
      authUser.email = payload.email;
      authUser.firstName = payload.firstName;
      authUser.lastName = payload.lastName;
      authUser.imageUrl = payload.imageUrl;
    } else {
      await this.enrichFromClerk(authUser, payload.sub);
    }

    const dbUser = await this.userRepo.findOne({ where: { clerkUserId: payload.sub } });
    if (dbUser) {
      authUser.dbUserId = dbUser.id;
      authUser.organizationId = dbUser.organizationId ?? undefined;

      const userRoles = await this.userRoleRepo.find({
        where: { userId: dbUser.id },
        relations: ['role'],
      });
      const orgMembers = await this.orgMemberRepo.find({
        where: { userId: dbUser.id },
        relations: ['role'],
      });
      const systemRoles = userRoles.map((ur) => ur.role?.name).filter(Boolean);
      const orgRoles = orgMembers.map((om) => om.role?.name).filter(Boolean);
      authUser.roles = [...new Set([...systemRoles, ...orgRoles])];
    }

    return authUser;
  }

  private async enrichFromClerk(authUser: AuthenticatedUser, clerkUserId: string): Promise<void> {
    const clerkUser = await this.clerkClient.users.getUser(clerkUserId);
    const primary = clerkUser.emailAddresses.find((ea) => ea.id === clerkUser.primaryEmailAddressId);
    authUser.email = primary?.emailAddress;
    authUser.firstName = clerkUser.firstName ?? undefined;
    authUser.lastName = clerkUser.lastName ?? undefined;
    authUser.imageUrl = clerkUser.imageUrl ?? undefined;
  }
}
