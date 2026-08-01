import { Inject } from '@nestjs/common';
import { ICommandHandler } from '@nestjs/cqrs';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { CommandHandlerStrict } from 'src/common';
import { STORE_REPO } from '../../../../constants';
import { IStoreRepo } from '../../i-store.repo';
import { StoreImageStorage } from '../../storage';
import { RemoveStoreImageCommand } from './remove-store-image.command';

@CommandHandlerStrict(RemoveStoreImageCommand)
export class RemoveStoreImageCommandHandler implements ICommandHandler<RemoveStoreImageCommand, boolean> {
  constructor(
    @Inject(STORE_REPO) private readonly repo: IStoreRepo,
    private readonly storage: StoreImageStorage,
    @InjectPinoLogger(RemoveStoreImageCommandHandler.name) private readonly logger: PinoLogger,
  ) {}

  public async execute(command: RemoveStoreImageCommand): Promise<boolean> {
    this.logger.info(`Executing ${RemoveStoreImageCommand.name} storeId=${command.storeId}`);
    const store = await this.repo.getAsync(command.storeId);
    if (store.imageKey) {
      await this.storage.removeAsync(store.imageKey);
      store.imageKey = undefined;
      await this.repo.updateAsync(store);
    }
    return true;
  }
}
