import { Inject } from '@nestjs/common';
import { ICommandHandler } from '@nestjs/cqrs';
import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { CommandHandlerStrict } from '../../../../../common';
import { STORE_REPO } from '../../../../constants';
import { Store } from '../../domain';
import { IStoreRepo } from '../..';
import { UpdateStoreCommand } from './update-store.command';

@CommandHandlerStrict(UpdateStoreCommand)
export class UpdateStoreCommandHandler implements ICommandHandler<UpdateStoreCommand, Store> {
  constructor(
    @Inject(STORE_REPO) private readonly repo: IStoreRepo,
    @InjectMapper() private readonly mapper: Mapper,
    @InjectPinoLogger(UpdateStoreCommandHandler.name) private readonly logger: PinoLogger,
  ) {}

  public async execute(command: UpdateStoreCommand): Promise<Store> {
    this.logger.info(`Executing ${UpdateStoreCommand.name} id=${command.id}`);
    const existing = await this.repo.getAsync(command.id);
    const patch    = this.mapper.map(command, UpdateStoreCommand, Store);
    (Object.keys(patch) as Array<keyof Store>).forEach((key) => {
      if (patch[key] !== undefined) {
        (existing as unknown as Record<string, unknown>)[key] = patch[key];
      }
    });
    return this.repo.updateAsync(existing);
  }
}
