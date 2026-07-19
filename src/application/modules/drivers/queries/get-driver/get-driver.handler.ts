import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { GetDriverQuery } from './get-driver.query';
import { Inject, NotFoundException } from '@nestjs/common';
import { DRIVER_REPO } from '../../../../constants';
import { IDriverRepo } from '../../repositories/i-driver.repo';
import { Driver } from '../../domain/driver';

@QueryHandler(GetDriverQuery)
export class GetDriverHandler implements IQueryHandler<GetDriverQuery, Driver> {
  constructor(@Inject(DRIVER_REPO) private readonly driverRepo: IDriverRepo) {}

  async execute(query: GetDriverQuery): Promise<Driver> {
    const driver = await this.driverRepo.getAsync(query.id);
    if (!driver) {
      throw new NotFoundException(`Driver with ID ${query.id} not found`);
    }
    return driver;
  }
}
