import { Inject } from '@nestjs/common';
import { ICommandHandler } from '@nestjs/cqrs';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { CommandHandlerStrict } from 'src/common';
import { LOCATION_REPO } from '../../../../constants';
import { ILocationRepo } from '../../i-location.repo';
import { LocationImageStorage } from '../../storage';
import { RemoveLocationImageCommand } from './remove-location-image.command';

@CommandHandlerStrict(RemoveLocationImageCommand)
export class RemoveLocationImageCommandHandler implements ICommandHandler<RemoveLocationImageCommand, boolean> {
  constructor(
    @Inject(LOCATION_REPO) private readonly repo: ILocationRepo,
    private readonly storage: LocationImageStorage,
    @InjectPinoLogger(RemoveLocationImageCommandHandler.name) private readonly logger: PinoLogger,
  ) {}

  public async execute(command: RemoveLocationImageCommand): Promise<boolean> {
    this.logger.info(`Executing ${RemoveLocationImageCommand.name} locationId=${command.locationId}`);
    const location = await this.repo.getAsync(command.locationId);
    if (location.imageKey) {
      await this.storage.removeAsync(location.imageKey);
      location.imageKey = undefined;
      await this.repo.updateAsync(location);
    }
    return true;
  }
}
