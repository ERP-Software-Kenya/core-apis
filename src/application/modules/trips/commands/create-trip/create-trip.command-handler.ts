import { ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { InjectMapper } from '@automapper/nestjs';
import { Mapper } from '@automapper/core';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { CommandHandlerStrict } from '../../../../common';
import { TRIP_REPO } from '../../../../constants';
import { ITripRepo } from '../../repositories/i-trip.repo';
import { Trip } from '../../domain';
import { CreateTripCommand } from './create-trip.command';

@CommandHandlerStrict(CreateTripCommand)
export class CreateTripHandler implements ICommandHandler<CreateTripCommand, Trip> {
  public constructor(
    @Inject(TRIP_REPO) private readonly tripRepo: ITripRepo,
    @InjectMapper() private readonly mapper: Mapper,
    @InjectPinoLogger(CreateTripHandler.name) private readonly logger: PinoLogger,
  ) {}

  public async execute(command: CreateTripCommand): Promise<Trip> {
    this.logger.info(`Executing Command '${CreateTripCommand.name}'`);
    const trip = this.mapper.map(command, CreateTripCommand, Trip);
    return this.tripRepo.createAsync(trip);
  }
}
