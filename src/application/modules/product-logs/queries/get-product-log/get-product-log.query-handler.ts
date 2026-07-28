import { Inject } from '@nestjs/common';
import type { IQueryHandler } from '@nestjs/cqrs';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { QueryHandlerStrict } from 'src/common';
import { PRODUCT_LOG_REPO } from '../../../../constants';
import { ProductLog } from '../../domain';
import { IProductLogRepo } from '../../i-product-log.repo';
import { GetProductLogQuery } from './get-product-log.query';

@QueryHandlerStrict(GetProductLogQuery)
export class GetProductLogQueryHandler implements IQueryHandler<GetProductLogQuery, ProductLog> {
  constructor(
    @Inject(PRODUCT_LOG_REPO) private readonly repo: IProductLogRepo,
    @InjectPinoLogger(GetProductLogQueryHandler.name) private readonly logger: PinoLogger,
  ) {}

  public async execute(query: GetProductLogQuery): Promise<ProductLog> {
    this.logger.info(`Executing ${GetProductLogQuery.name} id=${query.id}`);
    return this.repo.getAsync(query.id);
  }
}
