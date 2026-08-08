import { IQueryHandler } from '@nestjs/cqrs';
import { Inject, NotFoundException } from '@nestjs/common';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { QueryHandlerStrict } from '../../../../common';
import { TRIP_REPO } from '../../../../constants';
import { ITripRepo } from '../../repositories/i-trip.repo';
import { Trip } from '../../domain';
import { GetTripQuery } from './get-trip.query';

@QueryHandlerStrict(GetTripQuery)
export class GetTripHandler implements IQueryHandler<GetTripQuery, Trip> {
  public constructor(
    @Inject(TRIP_REPO) private readonly tripRepo: ITripRepo,
    @InjectPinoLogger(GetTripHandler.name) private readonly logger: PinoLogger,
  ) {}

  public async execute(query: GetTripQuery): Promise<Trip> {
    this.logger.info(`Executing Query '${GetTripQuery.name}'`);
    const trip = await this.tripRepo.getAsync(query.id);
    if (!trip) {
      throw new NotFoundException(`Trip with ID ${query.id} not found`);
    }
    return trip;
  }
}
