import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { UserRolesController } from './user-roles.controller';
import { UserRoleCommandHandlers } from './commands';
import { UserRoleQueryHandlers } from './queries';
import { UserRoleProfile } from './mapper';

@Module({
  imports:     [CqrsModule],
  controllers: [UserRolesController],
  providers:   [
    ...UserRoleCommandHandlers,
    ...UserRoleQueryHandlers,
    UserRoleProfile,
  ],
})
export class UserRolesModule {}
