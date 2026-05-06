import { Inject } from '@nestjs/common';
import { ICommandHandler } from '@nestjs/cqrs';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { CommandHandlerStrict } from '../../../../../common';
import { USER_ROLE_REPO } from '../../../../constants';
import { UserRole } from '../../domain';
import { IUserRoleRepo } from '../..';
import { CreateUserRoleCommand } from './create-user-role.command';

@CommandHandlerStrict(CreateUserRoleCommand)
export class CreateUserRoleCommandHandler implements ICommandHandler<CreateUserRoleCommand, UserRole> {
  constructor(
    @Inject(USER_ROLE_REPO) private readonly repo: IUserRoleRepo,
    @InjectPinoLogger(CreateUserRoleCommandHandler.name) private readonly logger: PinoLogger,
  ) {}

  public async execute(command: CreateUserRoleCommand): Promise<UserRole> {
    this.logger.info(`Executing ${CreateUserRoleCommand.name}`);
    return this.repo.createAsync(command as any);
  }
}
