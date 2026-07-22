import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateTripCommand } from './create-trip.command';
import { Inject, Logger } from '@nestjs/common';
import { TRIP_REPO } from '../../../../constants';
import { ITripRepo } from '../../repositories/i-trip.repo';
import { Trip } from '../../domain';

@CommandHandler(CreateTripCommand)
export class CreateTripHandler implements ICommandHandler<CreateTripCommand, Trip> {
  private readonly logger = new Logger(CreateTripHandler.name);

  constructor(@Inject(TRIP_REPO) private readonly tripRepo: ITripRepo) {}

  async execute(command: CreateTripCommand): Promise<Trip> {
    this.logger.log('Executing CreateTripCommand');
    return await this.tripRepo.createAsync(command as unknown as Trip);
  }

}
