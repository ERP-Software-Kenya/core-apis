import { Inject } from '@nestjs/common';
import { ICommandHandler } from '@nestjs/cqrs';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { CommandHandlerStrict } from '../../../../../common';
import { STORE_REPO } from '../../../../constants';
import { Store } from '../../domain';
import { IStoreRepo } from '../..';
import { CreateStoreCommand } from './create-store.command';

@CommandHandlerStrict(CreateStoreCommand)
export class CreateStoreCommandHandler implements ICommandHandler<CreateStoreCommand, Store> {
  constructor(
    @Inject(STORE_REPO) private readonly repo: IStoreRepo,
    @InjectPinoLogger(CreateStoreCommandHandler.name) private readonly logger: PinoLogger,
  ) {}

  public async execute(command: CreateStoreCommand): Promise<Store> {
    this.logger.info(`Executing ${CreateStoreCommand.name}`);
    return this.repo.createAsync({ name: command.name } as Store);
  }
}
