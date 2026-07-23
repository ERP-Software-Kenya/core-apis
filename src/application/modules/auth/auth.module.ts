import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthController } from './auth.controller';
import { AuthCommandHandlers } from './commands';
import { AuthQueryHandlers } from './queries';
import { AuthProfile } from './mapper';
import { ClerkJwtStrategy, RolesGuard, CLERK_STRATEGY } from '../../../common';
import {
  UserEntity,
  UserRoleEntity,
  OrgMemberEntity,
  RoleEntity,
  OrganizationEntity,
} from '../../../infrastructure/persistence/entities';

@Module({
  imports: [
    CqrsModule,
    PassportModule.register({ defaultStrategy: CLERK_STRATEGY }),
    // Register entities so ClerkJwtStrategy can inject TypeORM repositories
    TypeOrmModule.forFeature([
      UserEntity,
      UserRoleEntity,
      OrgMemberEntity,
      RoleEntity,
      OrganizationEntity,
    ]),
  ],
  controllers: [AuthController],
  providers: [
    ClerkJwtStrategy,
    RolesGuard,
    AuthProfile,
    ...AuthCommandHandlers,
    ...AuthQueryHandlers,
  ],
  exports: [ClerkJwtStrategy, RolesGuard, PassportModule],
})
export class AuthModule {}
