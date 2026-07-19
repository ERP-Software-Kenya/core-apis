import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { SearchDriversQuery } from './search-drivers.query';
import { Inject } from '@nestjs/common';
import { DRIVER_REPO } from 'src/application/constants';
import { IDriverRepo } from '../../repositories/i-driver.repo';
import { IPageable } from 'src/common';
import { DriverFilterNormalizer } from '../../helpers';
import { Driver } from '../../domain';

@QueryHandler(SearchDriversQuery)
export class SearchDriversHandler implements IQueryHandler<SearchDriversQuery, IPageable<Driver>> {
  constructor(
    @Inject(DRIVER_REPO) private readonly driverRepo: IDriverRepo,
    @Inject(DriverFilterNormalizer) private readonly filterNormalizer: DriverFilterNormalizer,
  ) {}

  async execute(query: SearchDriversQuery): Promise<IPageable<Driver>> {
    const filter = this.filterNormalizer.pageableNormalize(query);
    return await this.driverRepo.pagedAsync(filter);
  }
}


