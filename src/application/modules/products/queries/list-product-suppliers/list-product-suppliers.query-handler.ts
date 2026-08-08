import { Inject } from '@nestjs/common';
import { IQueryHandler } from '@nestjs/cqrs';
import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { IBaseRepo, QueryHandlerStrict } from '../../../../../common';
import { PRODUCT_SUPPLIER_REPO } from '../../../../constants';
import { ProductSupplier } from '../../domain';
import { ListProductSuppliersQuery } from './list-product-suppliers.query';

@QueryHandlerStrict(ListProductSuppliersQuery)
export class ListProductSuppliersQueryHandler implements IQueryHandler<ListProductSuppliersQuery, ProductSupplier[]> {
  constructor(
    @Inject(PRODUCT_SUPPLIER_REPO) private readonly repo: IBaseRepo<ProductSupplier, string>,
    @InjectMapper() private readonly mapper: Mapper,
    @InjectPinoLogger(ListProductSuppliersQueryHandler.name) private readonly logger: PinoLogger,
  ) {}

  public async execute(query: ListProductSuppliersQuery): Promise<ProductSupplier[]> {
    this.logger.info(`Listing suppliers for product ${query.productId}`);
    return this.repo.allAsync({ productId: query.productId } as Partial<ProductSupplier>);
  }
}
