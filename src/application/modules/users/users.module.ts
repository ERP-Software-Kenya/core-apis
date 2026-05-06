import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { UsersController } from './users.controller';
import { UserCommandHandlers } from './commands';
import { UserQueryHandlers } from './queries';
import { UserProfile } from './mapper';

@Module({
  imports:     [CqrsModule],
  controllers: [UsersController],
  providers:   [
    ...UserCommandHandlers,
    ...UserQueryHandlers,
    UserProfile,
  ],
})
export class UsersModule {}
