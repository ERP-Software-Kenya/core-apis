import { Inject } from '@nestjs/common';
import { ICommandHandler } from '@nestjs/cqrs';
import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { CommandHandlerStrict } from 'src/common';
import { LOCATION_REPO } from '../../../../constants';
import { Location } from '../../domain';
import { ILocationRepo } from '../../i-location.repo';
import { CreateLocationCommand } from './create-location.command';

@CommandHandlerStrict(CreateLocationCommand)
export class CreateLocationCommandHandler implements ICommandHandler<CreateLocationCommand, Location> {
  constructor(
    @Inject(LOCATION_REPO) private readonly repo: ILocationRepo,
    @InjectMapper() private readonly mapper: Mapper,
    @InjectPinoLogger(CreateLocationCommandHandler.name) private readonly logger: PinoLogger,
  ) {}

  public async execute(command: CreateLocationCommand): Promise<Location> {
    this.logger.info(`Executing ${CreateLocationCommand.name}`);
    const location    = this.mapper.map(command, CreateLocationCommand, Location);
    location.isActive = true;
    return this.repo.createAsync(location);
  }
}
