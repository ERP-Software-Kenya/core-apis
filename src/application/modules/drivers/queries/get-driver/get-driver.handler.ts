import { IQueryHandler } from '@nestjs/cqrs';
import { Inject, NotFoundException } from '@nestjs/common';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { QueryHandlerStrict } from 'src/common';
import { DRIVER_REPO } from 'src/application/constants';
import { IDriverRepo } from '../../repositories/i-driver.repo';
import { Driver } from '../../domain';
import { GetDriverQuery } from './get-driver.query';

@QueryHandlerStrict(GetDriverQuery)
export class GetDriverHandler implements IQueryHandler<GetDriverQuery, Driver> {
  public constructor(
    @Inject(DRIVER_REPO) private readonly driverRepo: IDriverRepo,
    @InjectPinoLogger(GetDriverHandler.name) private readonly logger: PinoLogger,
  ) {}

  public async execute(query: GetDriverQuery): Promise<Driver> {
    this.logger.info(`Executing Query '${GetDriverQuery.name}'`);
    const driver = await this.driverRepo.getAsync(query.id);
    if (!driver) {
      throw new NotFoundException(`Driver with ID ${query.id} not found`);
    }
    return driver;
  }
}
