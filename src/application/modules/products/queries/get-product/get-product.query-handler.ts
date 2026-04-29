import { Inject } from '@nestjs/common';
import type { IQueryHandler } from '@nestjs/cqrs';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { QueryHandlerStrict } from '../../../../../common';
import { PRODUCT_REPO } from '../../../../constants';
import { Product } from '../../domain';
import { IProductRepo } from '../..';
import { GetProductQuery } from './get-product.query';

@QueryHandlerStrict(GetProductQuery)
export class GetProductQueryHandler implements IQueryHandler<GetProductQuery, Product> {
  constructor(
    @Inject(PRODUCT_REPO) private readonly repo: IProductRepo,
    @InjectPinoLogger(GetProductQueryHandler.name) private readonly logger: PinoLogger,
  ) {}

  public async execute(query: GetProductQuery): Promise<Product> {
    this.logger.info(`Executing ${GetProductQuery.name} id=${query.id}`);
    return this.repo.getAsync(query.id);
  }
}
