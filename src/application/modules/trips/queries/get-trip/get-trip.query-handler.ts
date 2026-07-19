import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { GetTripQuery } from './get-trip.query';
import { Inject, NotFoundException } from '@nestjs/common';
import { TRIP_REPO } from '../../../../constants';
import { ITripRepo } from '../../repositories';
import { Trip } from '../../domain';

@QueryHandler(GetTripQuery)
export class GetTripHandler implements IQueryHandler<GetTripQuery, Trip> {
  constructor(@Inject(TRIP_REPO) private readonly tripRepo: ITripRepo) {}

  async execute(query: GetTripQuery): Promise<Trip> {
    const trip = await this.tripRepo.getAsync(query.id);
    if (!trip) {
      throw new NotFoundException(`Trip with ID ${query.id} not found`);
    }
    return trip;
  }
}
