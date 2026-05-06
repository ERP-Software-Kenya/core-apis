import { Inject } from '@nestjs/common';
import { ICommandHandler } from '@nestjs/cqrs';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { CommandHandlerStrict } from '../../../../../common';
import { ROLE_REPO } from '../../../../constants';
import { Role } from '../../domain';
import { IRoleRepo } from '../..';
import { CreateRoleCommand } from './create-role.command';

@CommandHandlerStrict(CreateRoleCommand)
export class CreateRoleCommandHandler implements ICommandHandler<CreateRoleCommand, Role> {
  constructor(
    @Inject(ROLE_REPO) private readonly repo: IRoleRepo,
    @InjectPinoLogger(CreateRoleCommandHandler.name) private readonly logger: PinoLogger,
  ) {}

  public async execute(command: CreateRoleCommand): Promise<Role> {
    this.logger.info(`Executing ${CreateRoleCommand.name}`);
    return this.repo.createAsync(command as any);
  }
}
