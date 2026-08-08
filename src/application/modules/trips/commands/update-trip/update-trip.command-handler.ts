import { ICommandHandler } from '@nestjs/cqrs';
import { Inject, NotFoundException } from '@nestjs/common';
import { InjectMapper } from '@automapper/nestjs';
import { Mapper } from '@automapper/core';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { CommandHandlerStrict } from '../../../../common';
import { TRIP_REPO } from '../../../../constants';
import { ITripRepo } from '../../repositories/i-trip.repo';
import { Trip } from '../../domain';
import { UpdateTripCommand } from './update-trip.command';

@CommandHandlerStrict(UpdateTripCommand)
export class UpdateTripHandler implements ICommandHandler<UpdateTripCommand, Trip> {
  public constructor(
    @Inject(TRIP_REPO) private readonly tripRepo: ITripRepo,
    @InjectMapper() private readonly mapper: Mapper,
    @InjectPinoLogger(UpdateTripHandler.name) private readonly logger: PinoLogger,
  ) {}

  public async execute(command: UpdateTripCommand): Promise<Trip> {
    this.logger.info(`Executing Command '${UpdateTripCommand.name}'`);
    const existing = await this.tripRepo.getAsync(command.id);
    if (!existing) {
      throw new NotFoundException(`Trip with ID ${command.id} not found`);
    }
    const update = this.mapper.map(command, UpdateTripCommand, Trip);
    const merged: Trip = { ...existing, ...update };
    return this.tripRepo.updateAsync(merged);
  }
}
