import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateVehicleCommand } from './create-vehicle.command';
import { Inject, Logger } from '@nestjs/common';
import { VEHICLE_REPO } from '../../../../constants';
import { IVehicleRepo } from '../../repositories/i-vehicle.repo';
import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Vehicle } from '../../domain';
import { CreateVehicleRequest } from '../../models';

@CommandHandler(CreateVehicleCommand)
export class CreateVehicleHandler implements ICommandHandler<CreateVehicleCommand, Vehicle> {
  private readonly logger = new Logger(CreateVehicleHandler.name);

  constructor(
    @Inject(VEHICLE_REPO) private readonly vehicleRepo: IVehicleRepo,
    @InjectMapper() private readonly mapper: Mapper,
  ) {}

  async execute(command: CreateVehicleCommand): Promise<Vehicle> {
    this.logger.log('Executing CreateVehicleCommand');
    const vehicle = this.mapper.map(command.request, CreateVehicleRequest, Vehicle);
    return await this.vehicleRepo.createAsync(vehicle);
  }
}
