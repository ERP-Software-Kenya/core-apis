import { Inject } from '@nestjs/common';
import { ICommandHandler } from '@nestjs/cqrs';
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
    @InjectPinoLogger(UpdateStoreCommandHandler.name) private readonly logger: PinoLogger,
  ) {}

  public async execute(command: UpdateStoreCommand): Promise<Store> {
    this.logger.info(`Executing ${UpdateStoreCommand.name} id=${command.id}`);
    const entity = await this.repo.getAsync(command.id);
    if(command.name) entity.name = command.name;
    return this.repo.updateAsync(entity);
  }
}
