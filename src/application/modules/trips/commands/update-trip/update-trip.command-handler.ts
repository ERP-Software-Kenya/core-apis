import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UpdateTripCommand } from './update-trip.command';
import { Inject, NotFoundException } from '@nestjs/common';
import { TRIP_REPO } from '../../../../constants';
import { ITripRepo } from '../../repositories/i-trip.repo';
import { Trip } from '../../domain';

@CommandHandler(UpdateTripCommand)
export class UpdateTripHandler implements ICommandHandler<UpdateTripCommand, Trip> {
  constructor(@Inject(TRIP_REPO) private readonly tripRepo: ITripRepo) {}

  async execute(command: UpdateTripCommand): Promise<Trip> {
    const existingTrip = await this.tripRepo.getAsync(command.id);
    if (!existingTrip) {
      throw new NotFoundException(`Trip with ID ${command.id} not found`);
    }

    const updatedTrip = { ...existingTrip, ...command.request };
    return await this.tripRepo.updateAsync(updatedTrip);
  }
}
