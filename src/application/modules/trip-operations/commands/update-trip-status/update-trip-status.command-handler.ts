import { ICommandHandler } from '@nestjs/cqrs';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { DataSource } from 'typeorm';
import { CommandHandlerStrict } from '../../../../../common';
import { TripEntity } from '../../../../../infrastructure/persistence/entities';
import { UpdateTripStatusCommand } from './update-trip-status.command';

@CommandHandlerStrict(UpdateTripStatusCommand)
export class UpdateTripStatusCommandHandler implements ICommandHandler<UpdateTripStatusCommand, TripEntity> {
  public constructor(
    private readonly dataSource: DataSource,
    @InjectPinoLogger(UpdateTripStatusCommandHandler.name) private readonly logger: PinoLogger,
  ) {}

  public async execute(command: UpdateTripStatusCommand): Promise<TripEntity> {
    this.logger.info(`Executing Command '${UpdateTripStatusCommand.name}' tripId=${command.tripId} status=${command.status}`);

    await this.dataSource
      .getRepository(TripEntity)
      .update(command.tripId, { tripStatus: command.status });

    return this.dataSource.getRepository(TripEntity).findOneOrFail({ where: { id: command.tripId } });
  }
}
