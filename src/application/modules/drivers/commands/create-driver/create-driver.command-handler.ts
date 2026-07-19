import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateDriverCommand } from './create-driver.command';
import { Inject, Logger } from '@nestjs/common';
import { DRIVER_REPO } from 'src/application/constants';
import { IDriverRepo } from '../../repositories/i-driver.repo';
import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Driver } from '../../domain';
import { CreateDriverRequest } from '../../models';

@CommandHandler(CreateDriverCommand)
export class CreateDriverHandler implements ICommandHandler<CreateDriverCommand, Driver> {
  private readonly logger = new Logger(CreateDriverHandler.name);

  constructor(
    @Inject(DRIVER_REPO) private readonly driverRepo: IDriverRepo,
    @InjectMapper() private readonly mapper: Mapper,
  ) {}

  async execute(command: CreateDriverCommand): Promise<Driver> {
    this.logger.log('Executing CreateDriverCommand');
    const driver = this.mapper.map(command.request, CreateDriverRequest, Driver);
    return await this.driverRepo.createAsync(driver);
  }
}
