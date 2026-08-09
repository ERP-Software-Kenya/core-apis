import { ICommandHandler } from '@nestjs/cqrs';
import { Inject, NotFoundException } from '@nestjs/common';
import { InjectMapper } from '@automapper/nestjs';
import { Mapper } from '@automapper/core';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { CommandHandlerStrict } from 'src/common';
import { VEHICLE_REPO } from 'src/application/constants';
import { IVehicleRepo } from '../../repositories/i-vehicle.repo';
import { Vehicle } from '../../domain';
import { UpdateVehicleCommand } from './update-vehicle.command';

@CommandHandlerStrict(UpdateVehicleCommand)
export class UpdateVehicleHandler implements ICommandHandler<UpdateVehicleCommand, Vehicle> {
  public constructor(
    @Inject(VEHICLE_REPO) private readonly vehicleRepo: IVehicleRepo,
    @InjectMapper() private readonly mapper: Mapper,
    @InjectPinoLogger(UpdateVehicleHandler.name) private readonly logger: PinoLogger,
  ) {}

  public async execute(command: UpdateVehicleCommand): Promise<Vehicle> {
    this.logger.info(`Executing Command '${UpdateVehicleCommand.name}'`);
    const existing = await this.vehicleRepo.getAsync(command.id);
    if (!existing) {
      throw new NotFoundException(`Vehicle with ID ${command.id} not found`);
    }
    const update = this.mapper.map(command, UpdateVehicleCommand, Vehicle);
    const merged: Vehicle = { ...existing, ...update };
    return this.vehicleRepo.updateAsync(merged);
  }
}
