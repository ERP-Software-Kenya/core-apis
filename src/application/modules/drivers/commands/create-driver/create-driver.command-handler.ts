import { ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { InjectMapper } from '@automapper/nestjs';
import { Mapper } from '@automapper/core';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { CommandHandlerStrict } from '../../../../common';
import { DRIVER_REPO } from '../../../../constants';
import { IDriverRepo } from '../../repositories/i-driver.repo';
import { Driver } from '../../domain';
import { CreateDriverCommand } from './create-driver.command';

@CommandHandlerStrict(CreateDriverCommand)
export class CreateDriverHandler implements ICommandHandler<CreateDriverCommand, Driver> {
  public constructor(
    @Inject(DRIVER_REPO) private readonly driverRepo: IDriverRepo,
    @InjectMapper() private readonly mapper: Mapper,
    @InjectPinoLogger(CreateDriverHandler.name) private readonly logger: PinoLogger,
  ) {}

  public async execute(command: CreateDriverCommand): Promise<Driver> {
    this.logger.info(`Executing Command '${CreateDriverCommand.name}'`);
    const driver = this.mapper.map(command, CreateDriverCommand, Driver);
    return this.driverRepo.createAsync(driver);
  }
}
