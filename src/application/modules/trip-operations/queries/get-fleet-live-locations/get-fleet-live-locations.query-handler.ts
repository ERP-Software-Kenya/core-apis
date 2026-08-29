import { IQueryHandler } from '@nestjs/cqrs';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { DataSource } from 'typeorm';
import { QueryHandlerStrict } from '../../../../../common';
import { TripEntity, VehicleLocationEntity } from '../../../../../infrastructure/persistence/entities';
import { ETripStatus } from '../../../../shared/enums/e-trip-status';
import { GetFleetLiveLocationsQuery } from './get-fleet-live-locations.query';

export interface FleetLiveLocation {
  tripId: string;
  driverId: string;
  vehicleId: string;
  latitude: number;
  longitude: number;
  gpsTime: Date;
}

@QueryHandlerStrict(GetFleetLiveLocationsQuery)
export class GetFleetLiveLocationsQueryHandler
  implements IQueryHandler<GetFleetLiveLocationsQuery, FleetLiveLocation[]> {
  public constructor(
    private readonly dataSource: DataSource,
    @InjectPinoLogger(GetFleetLiveLocationsQueryHandler.name) private readonly logger: PinoLogger,
  ) {}

  public async execute(query: GetFleetLiveLocationsQuery): Promise<FleetLiveLocation[]> {
    this.logger.info(`Executing Query '${GetFleetLiveLocationsQuery.name}' orgId=${query.organizationId}`);

    const activeTrips = await this.dataSource
      .getRepository(TripEntity)
      .find({ where: { tripStatus: ETripStatus.InTransit } });

    const results: FleetLiveLocation[] = [];

    for (const trip of activeTrips) {
      const location = await this.dataSource
        .getRepository(VehicleLocationEntity)
        .findOne({ where: { vehicleId: trip.vehicleId } });

      if (!location) continue;

      results.push({
        tripId: trip.id,
        driverId: trip.driverId,
        vehicleId: trip.vehicleId,
        latitude: Number(location.latitude),
        longitude: Number(location.longitude),
        gpsTime: location.gpsTime,
      });
    }

    return results;
  }
}
