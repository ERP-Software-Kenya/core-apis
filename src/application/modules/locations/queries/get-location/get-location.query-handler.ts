import { Inject } from '@nestjs/common';
import type { IQueryHandler } from '@nestjs/cqrs';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { QueryHandlerStrict } from 'src/common';
import { LOCATION_REPO } from '../../../../constants';
import { Location } from '../../domain';
import { ILocationRepo } from '../../i-location.repo';
import { GetLocationQuery } from './get-location.query';

@QueryHandlerStrict(GetLocationQuery)
export class GetLocationQueryHandler implements IQueryHandler<GetLocationQuery, Location> {
  constructor(
    @Inject(LOCATION_REPO) private readonly repo: ILocationRepo,
    @InjectPinoLogger(GetLocationQueryHandler.name) private readonly logger: PinoLogger,
  ) {}

  public async execute(query: GetLocationQuery): Promise<Location> {
    this.logger.info(`Executing ${GetLocationQuery.name} id=${query.id}`);
    return this.repo.getAsync(query.id);
  }
}
