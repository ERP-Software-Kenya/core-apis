import { ICommandHandler } from '@nestjs/cqrs';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { DataSource } from 'typeorm';
import { CommandHandlerStrict } from '../../../../../common';
import { CentrifugalService } from '../../../../../common/centrifugal';
import { TripEntity, VehicleLocationEntity } from '../../../../../infrastructure/persistence/entities';
import { UpdateDriverLocationCommand } from './update-driver-location.command';

@CommandHandlerStrict(UpdateDriverLocationCommand)
export class UpdateDriverLocationCommandHandler implements ICommandHandler<UpdateDriverLocationCommand, void> {
  public constructor(
    private readonly dataSource: DataSource,
    private readonly centrifugal: CentrifugalService,
    @InjectPinoLogger(UpdateDriverLocationCommandHandler.name) private readonly logger: PinoLogger,
  ) {}

  public async execute(command: UpdateDriverLocationCommand): Promise<void> {
    this.logger.info(`Executing Command '${UpdateDriverLocationCommand.name}' tripId=${command.tripId}`);

    const trip = await this.dataSource
      .getRepository(TripEntity)
      .findOneOrFail({ where: { id: command.tripId } });

    const locationRepo = this.dataSource.getRepository(VehicleLocationEntity);
    const existing = await locationRepo.findOne({ where: { vehicleId: trip.vehicleId } });

    if (existing) {
      await locationRepo.update(existing.id, {
        latitude: command.latitude,
        longitude: command.longitude,
        gpsTime: new Date(),
      });
    } else {
      const newLocation = locationRepo.create({
        vehicleId: trip.vehicleId,
        latitude: command.latitude,
        longitude: command.longitude,
        gpsTime: new Date(),
      });
      await locationRepo.save(newLocation);
    }

    await this.centrifugal
      .publish(`org_${command.organizationId}`, {
        type: 'driver:location',
        driverId: command.driverId,
        tripId: command.tripId,
        latitude: command.latitude,
        longitude: command.longitude,
        timestamp: new Date(),
      })
      .catch((err: Error) =>
        this.logger.warn({ error: err.message }, 'Centrifugo driver:location publish failed — non-fatal'),
      );
  }
}
