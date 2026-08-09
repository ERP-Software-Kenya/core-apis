import { ICommandHandler } from '@nestjs/cqrs';
import { Inject, NotFoundException } from '@nestjs/common';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { CommandHandlerStrict } from 'src/common';
import { VEHICLE_REPO } from 'src/application/constants';
import { IVehicleRepo } from '../../repositories/i-vehicle.repo';
import { DeleteVehicleCommand } from './delete-vehicle.command';

@CommandHandlerStrict(DeleteVehicleCommand)
export class DeleteVehicleHandler implements ICommandHandler<DeleteVehicleCommand, boolean> {
  public constructor(
    @Inject(VEHICLE_REPO) private readonly vehicleRepo: IVehicleRepo,
    @InjectPinoLogger(DeleteVehicleHandler.name) private readonly logger: PinoLogger,
  ) {}

  public async execute(command: DeleteVehicleCommand): Promise<boolean> {
    this.logger.info(`Executing Command '${DeleteVehicleCommand.name}'`);
    const existing = await this.vehicleRepo.getAsync(command.id);
    if (!existing) {
      throw new NotFoundException(`Vehicle with ID ${command.id} not found`);
    }
    return this.vehicleRepo.deleteAsync(command.id);
  }
}
