import { IQueryHandler } from '@nestjs/cqrs';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { DataSource } from 'typeorm';
import { QueryHandlerStrict } from '../../../../../common';
import { TripEntity, TripStopEntity } from '../../../../../infrastructure/persistence/entities';
import { ETripStatus } from '../../../../shared/enums/e-trip-status';
import { GetDriverTripsTodayQuery } from './get-driver-trips-today.query';

export interface DriverTripItem {
  id: string;
  tripNumber: string;
  tripStatus: ETripStatus;
  startDatetime: Date;
  stopCount: number;
}

@QueryHandlerStrict(GetDriverTripsTodayQuery)
export class GetDriverTripsTodayQueryHandler
  implements IQueryHandler<GetDriverTripsTodayQuery, DriverTripItem[]> {
  public constructor(
    private readonly dataSource: DataSource,
    @InjectPinoLogger(GetDriverTripsTodayQueryHandler.name) private readonly logger: PinoLogger,
  ) {}

  public async execute(query: GetDriverTripsTodayQuery): Promise<DriverTripItem[]> {
    this.logger.info(`Executing Query '${GetDriverTripsTodayQuery.name}' driverId=${query.driverId}`);

    const todayStart = new Date();
    todayStart.setHours(0, 0, 0, 0);
    const todayEnd = new Date();
    todayEnd.setHours(23, 59, 59, 999);

    const trips = await this.dataSource
      .getRepository(TripEntity)
      .createQueryBuilder('trip')
      .where('trip.driverId = :driverId', { driverId: query.driverId })
      .andWhere('trip.startDatetime >= :todayStart', { todayStart })
      .andWhere('trip.startDatetime <= :todayEnd', { todayEnd })
      .andWhere('trip.tripStatus IN (:...statuses)', {
        statuses: [ETripStatus.Scheduled, ETripStatus.InTransit],
      })
      .getMany();

    const results: DriverTripItem[] = [];
    for (const trip of trips) {
      const stopCount = await this.dataSource
        .getRepository(TripStopEntity)
        .count({ where: { tripId: trip.id } });

      results.push({
        id: trip.id,
        tripNumber: trip.tripNumber,
        tripStatus: trip.tripStatus,
        startDatetime: trip.startDatetime,
        stopCount,
      });
    }

    return results;
  }
}
