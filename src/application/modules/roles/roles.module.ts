import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { RolesController } from './roles.controller';
import { RoleCommandHandlers } from './commands';
import { RoleQueryHandlers } from './queries';
import { RoleProfile } from './mapper';

@Module({
  imports:     [CqrsModule],
  controllers: [RolesController],
  providers:   [
    ...RoleCommandHandlers,
    ...RoleQueryHandlers,
    RoleProfile,
  ],
})
export class RolesModule {}
