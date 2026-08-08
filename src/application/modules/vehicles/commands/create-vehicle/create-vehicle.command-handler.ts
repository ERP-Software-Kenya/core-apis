import { ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { InjectMapper } from '@automapper/nestjs';
import { Mapper } from '@automapper/core';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { CommandHandlerStrict } from 'src/common';
import { VEHICLE_REPO } from 'src/application/constants';
import { IVehicleRepo } from '../../repositories/i-vehicle.repo';
import { Vehicle } from '../../domain';
import { CreateVehicleCommand } from './create-vehicle.command';

@CommandHandlerStrict(CreateVehicleCommand)
export class CreateVehicleHandler implements ICommandHandler<CreateVehicleCommand, Vehicle> {
  public constructor(
    @Inject(VEHICLE_REPO) private readonly vehicleRepo: IVehicleRepo,
    @InjectMapper() private readonly mapper: Mapper,
    @InjectPinoLogger(CreateVehicleHandler.name) private readonly logger: PinoLogger,
  ) {}

  public async execute(command: CreateVehicleCommand): Promise<Vehicle> {
    this.logger.info(`Executing Command '${CreateVehicleCommand.name}'`);
    const vehicle = this.mapper.map(command, CreateVehicleCommand, Vehicle);
    return this.vehicleRepo.createAsync(vehicle);
  }
}
