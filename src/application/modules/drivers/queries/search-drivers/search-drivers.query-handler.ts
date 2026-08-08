import { IQueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { QueryHandlerStrict, IFilterNormalizer, IPageable } from '../../../../common';
import { DRIVER_REPO } from '../../../../constants';
import { IDriverRepo } from '../../repositories/i-driver.repo';
import { Driver, DriverFilter } from '../../domain';
import { DriverFilterNormalizer } from '../../helpers';
import { SearchDriversQuery } from './search-drivers.query';

@QueryHandlerStrict(SearchDriversQuery)
export class SearchDriversHandler implements IQueryHandler<SearchDriversQuery, IPageable<Driver>> {
  public constructor(
    @Inject(DRIVER_REPO) private readonly driverRepo: IDriverRepo,
    @Inject(DriverFilterNormalizer) private readonly filterNormalizer: IFilterNormalizer<DriverFilter>,
    @InjectPinoLogger(SearchDriversHandler.name) private readonly logger: PinoLogger,
  ) {}

  public async execute(query: SearchDriversQuery): Promise<IPageable<Driver>> {
    this.logger.info(`Executing Query '${SearchDriversQuery.name}'`);
    const filter = this.filterNormalizer.pageableNormalize(query);
    return this.driverRepo.pagedAsync(filter as any);
  }
}
