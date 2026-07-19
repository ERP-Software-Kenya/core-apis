import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UpdateVehicleCommand } from './update-vehicle.command';
import { Inject, NotFoundException } from '@nestjs/common';
import { VEHICLE_REPO } from '../../../../constants';
import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Vehicle } from '../../domain';
import { IVehicleRepo } from '../../repositories';

@CommandHandler(UpdateVehicleCommand)
export class UpdateVehicleHandler implements ICommandHandler<UpdateVehicleCommand, Vehicle> {
  constructor(
    @Inject(VEHICLE_REPO) private readonly vehicleRepo: IVehicleRepo,
    @InjectMapper() private readonly mapper: Mapper,
  ) {}

  async execute(command: UpdateVehicleCommand): Promise<Vehicle> {
    const existingVehicle = await this.vehicleRepo.getAsync(command.id);
    if (!existingVehicle) {
      throw new NotFoundException(`Vehicle with ID ${command.id} not found`);
    }

    const updatedVehicle = { ...existingVehicle, ...command.request };
    return await this.vehicleRepo.updateAsync(updatedVehicle);
  }
}
