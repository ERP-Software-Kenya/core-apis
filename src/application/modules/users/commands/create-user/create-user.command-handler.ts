import { Inject } from '@nestjs/common';
import { ICommandHandler } from '@nestjs/cqrs';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { CommandHandlerStrict } from '../../../../../common';
import { USER_REPO } from '../../../../constants';
import { User } from '../../domain';
import { IUserRepo } from '../..';
import { CreateUserCommand } from './create-user.command';

@CommandHandlerStrict(CreateUserCommand)
export class CreateUserCommandHandler implements ICommandHandler<CreateUserCommand, User> {
  constructor(
    @Inject(USER_REPO) private readonly repo: IUserRepo,
    @InjectPinoLogger(CreateUserCommandHandler.name) private readonly logger: PinoLogger,
  ) {}

  public async execute(command: CreateUserCommand): Promise<User> {
    this.logger.info(`Executing ${CreateUserCommand.name}`);
    return this.repo.createAsync(command as any);
  }
}
