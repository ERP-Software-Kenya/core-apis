import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { DeleteVehicleCommand } from './delete-vehicle.command';
import { Inject, NotFoundException } from '@nestjs/common';
import { VEHICLE_REPO } from '../../../../constants';
import { IVehicleRepo } from '../../repositories/i-vehicle.repo';

@CommandHandler(DeleteVehicleCommand)
export class DeleteVehicleHandler implements ICommandHandler<DeleteVehicleCommand, boolean> {
  constructor(@Inject(VEHICLE_REPO) private readonly vehicleRepo: IVehicleRepo) {}

  async execute(command: DeleteVehicleCommand): Promise<boolean> {
    const existingVehicle = await this.vehicleRepo.getAsync(command.id);
    if (!existingVehicle) {
      throw new NotFoundException(`Vehicle with ID ${command.id} not found`);
    }

    return await this.vehicleRepo.deleteAsync(command.id);
  }
}
