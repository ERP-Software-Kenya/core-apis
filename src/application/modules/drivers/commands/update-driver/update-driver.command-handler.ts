import { ICommandHandler } from '@nestjs/cqrs';
import { Inject, NotFoundException } from '@nestjs/common';
import { InjectMapper } from '@automapper/nestjs';
import { Mapper } from '@automapper/core';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { CommandHandlerStrict } from 'src/common';
import { DRIVER_REPO } from 'src/application/constants';
import { IDriverRepo } from '../../repositories/i-driver.repo';
import { Driver } from '../../domain';
import { UpdateDriverCommand } from './update-driver.command';

@CommandHandlerStrict(UpdateDriverCommand)
export class UpdateDriverHandler implements ICommandHandler<UpdateDriverCommand, Driver> {
  public constructor(
    @Inject(DRIVER_REPO) private readonly driverRepo: IDriverRepo,
    @InjectMapper() private readonly mapper: Mapper,
    @InjectPinoLogger(UpdateDriverHandler.name) private readonly logger: PinoLogger,
  ) {}

  public async execute(command: UpdateDriverCommand): Promise<Driver> {
    this.logger.info(`Executing Command '${UpdateDriverCommand.name}'`);
    const existing = await this.driverRepo.getAsync(command.id);
    if (!existing) {
      throw new NotFoundException(`Driver with ID ${command.id} not found`);
    }
    const update = this.mapper.map(command, UpdateDriverCommand, Driver);
    const merged: Driver = { ...existing, ...update };
    return this.driverRepo.updateAsync(merged);
  }
}
