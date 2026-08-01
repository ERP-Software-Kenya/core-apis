import { Inject } from '@nestjs/common';
import { ICommandHandler } from '@nestjs/cqrs';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { CommandHandlerStrict } from 'src/common';
import { STORE_REPO } from '../../../../constants';
import { Store } from '../../domain';
import { IStoreRepo } from '../../i-store.repo';
import { StoreImageStorage } from '../../storage';
import { UploadStoreImageCommand } from './upload-store-image.command';

@CommandHandlerStrict(UploadStoreImageCommand)
export class UploadStoreImageCommandHandler implements ICommandHandler<UploadStoreImageCommand, Store> {
  constructor(
    @Inject(STORE_REPO) private readonly repo: IStoreRepo,
    private readonly storage: StoreImageStorage,
    @InjectPinoLogger(UploadStoreImageCommandHandler.name) private readonly logger: PinoLogger,
  ) {}

  public async execute(command: UploadStoreImageCommand): Promise<Store> {
    this.logger.info(`Executing ${UploadStoreImageCommand.name} storeId=${command.storeId}`);
    const objectKey = `stores/${command.storeId}/image/${Date.now()}`;
    const storedKey = await this.storage.writeAsync(objectKey, command.buffer, command.mimeType);
    const store     = await this.repo.getAsync(command.storeId);
    if (store.imageKey) {
      await this.storage.removeAsync(store.imageKey);
    }
    store.imageKey = storedKey;
    return this.repo.updateAsync(store);
  }
}
