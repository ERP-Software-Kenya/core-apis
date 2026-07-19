import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { DeleteTripCommand } from './delete-trip.command';
import { Inject, NotFoundException } from '@nestjs/common';
import { TRIP_REPO } from '../../../../constants';
import { ITripRepo } from '../../repositories/i-trip.repo';

@CommandHandler(DeleteTripCommand)
export class DeleteTripHandler implements ICommandHandler<DeleteTripCommand, boolean> {
  constructor(@Inject(TRIP_REPO) private readonly tripRepo: ITripRepo) {}

  async execute(command: DeleteTripCommand): Promise<boolean> {
    const existingTrip = await this.tripRepo.getAsync(command.id);
    if (!existingTrip) {
      throw new NotFoundException(`Trip with ID ${command.id} not found`);
    }

    return await this.tripRepo.deleteAsync(command.id);
  }
}
