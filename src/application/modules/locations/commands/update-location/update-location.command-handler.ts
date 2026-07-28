import { Inject } from '@nestjs/common';
import { ICommandHandler } from '@nestjs/cqrs';
import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { CommandHandlerStrict } from 'src/common';
import { LOCATION_REPO } from '../../../../constants';
import { Location } from '../../domain';
import { ILocationRepo } from '../../i-location.repo';
import { UpdateLocationCommand } from './update-location.command';

@CommandHandlerStrict(UpdateLocationCommand)
export class UpdateLocationCommandHandler implements ICommandHandler<UpdateLocationCommand, Location> {
  constructor(
    @Inject(LOCATION_REPO) private readonly repo: ILocationRepo,
    @InjectMapper() private readonly mapper: Mapper,
    @InjectPinoLogger(UpdateLocationCommandHandler.name) private readonly logger: PinoLogger,
  ) {}

  public async execute(command: UpdateLocationCommand): Promise<Location> {
    this.logger.info(`Executing ${UpdateLocationCommand.name} id=${command.id}`);
    const existing = await this.repo.getAsync(command.id);
    const patch    = this.mapper.map(command, UpdateLocationCommand, Location);
    (Object.keys(patch) as Array<keyof Location>).forEach((key) => {
      if (patch[key] !== undefined) {
        (existing as unknown as Record<string, unknown>)[key] = patch[key];
      }
    });
    return this.repo.updateAsync(existing);
  }
}
