import { Inject } from '@nestjs/common';
import { ICommandHandler } from '@nestjs/cqrs';
import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
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
    @InjectMapper() private readonly mapper: Mapper,
    @InjectPinoLogger(CreateStoreCommandHandler.name) private readonly logger: PinoLogger,
  ) {}

  public async execute(command: CreateStoreCommand): Promise<Store> {
    this.logger.info(`Executing ${CreateStoreCommand.name}`);
    const store    = this.mapper.map(command, CreateStoreCommand, Store);
    store.isActive = true;
    return this.repo.createAsync(store);
  }
}
