import { Inject } from '@nestjs/common';
import { IQueryHandler } from '@nestjs/cqrs';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { QueryHandlerStrict, IFilterNormalizer } from 'src/common';
import { DRIVER_REPO } from 'src/application/constants';
import { IDriverRepo } from '../../repositories/i-driver.repo';
import { Driver, DriverFilter } from '../../domain';
import { DriverFilterNormalizer } from '../../helpers';
import { ListDriversQuery } from './list-drivers.query';

@QueryHandlerStrict(ListDriversQuery)
export class ListDriversHandler implements IQueryHandler<ListDriversQuery, Driver[]> {
  constructor(
    @Inject(DRIVER_REPO) protected readonly repo: IDriverRepo,
    @Inject(DriverFilterNormalizer) protected readonly filterNormalizer: IFilterNormalizer<DriverFilter>,
    @InjectPinoLogger(ListDriversHandler.name) protected readonly logger: PinoLogger,
  ) {}

  public async execute(query: ListDriversQuery): Promise<Driver[]> {
    this.logger.info(`Executing Query "${ListDriversQuery.name}"`);
    const filter = this.filterNormalizer.normalize(query);
    return this.repo.allAsync(filter as any);
  }
}
