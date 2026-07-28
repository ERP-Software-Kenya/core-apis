import { Inject } from '@nestjs/common';
import { ICommandHandler } from '@nestjs/cqrs';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { CommandHandlerStrict } from 'src/common';
import { LOCATION_REPO } from '../../../../constants';
import { Location } from '../../domain';
import { ILocationRepo } from '../../i-location.repo';
import { LocationImageStorage } from '../../storage';
import { UploadLocationImageCommand } from './upload-location-image.command';

@CommandHandlerStrict(UploadLocationImageCommand)
export class UploadLocationImageCommandHandler implements ICommandHandler<UploadLocationImageCommand, Location> {
  constructor(
    @Inject(LOCATION_REPO) private readonly repo: ILocationRepo,
    private readonly storage: LocationImageStorage,
    @InjectPinoLogger(UploadLocationImageCommandHandler.name) private readonly logger: PinoLogger,
  ) {}

  public async execute(command: UploadLocationImageCommand): Promise<Location> {
    this.logger.info(`Executing ${UploadLocationImageCommand.name} locationId=${command.locationId}`);
    const objectKey       = `locations/${command.locationId}/image/${Date.now()}`;
    const storedKey       = await this.storage.writeAsync(objectKey, command.buffer, command.mimeType);
    const location        = await this.repo.getAsync(command.locationId);
    if (location.imageKey) {
      await this.storage.removeAsync(location.imageKey);
    }
    location.imageKey = storedKey;
    return this.repo.updateAsync(location);
  }
}
