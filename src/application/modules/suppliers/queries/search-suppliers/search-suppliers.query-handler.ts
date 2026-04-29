import { Inject } from '@nestjs/common';
import type { IQueryHandler } from '@nestjs/cqrs';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { QueryHandlerStrict } from '../../../../../common';
import { IFilterNormalizer, IPageable } from '../../../../../common';
import { SUPPLIER_REPO } from '../../../../constants';
import { Supplier, SupplierFilter } from '../../domain';
import { ISupplierRepo } from '../..';
import { SupplierFilterNormalizer } from '../../helpers';
import { SearchSuppliersQuery } from './search-suppliers.query';

@QueryHandlerStrict(SearchSuppliersQuery)
export class SearchSuppliersQueryHandler implements IQueryHandler<SearchSuppliersQuery, IPageable<Supplier>> {
  constructor(
    @Inject(SUPPLIER_REPO) protected readonly repo: ISupplierRepo,
    @Inject(SupplierFilterNormalizer) protected readonly filterNormalizer: IFilterNormalizer<SupplierFilter>,
    @InjectPinoLogger(SearchSuppliersQueryHandler.name) protected readonly logger: PinoLogger,
  ) {}

  public async execute(query: SearchSuppliersQuery): Promise<IPageable<Supplier>> {
    this.logger.info(`Executing Query "${SearchSuppliersQuery.name}"`);
    const filter = this.filterNormalizer.pageableNormalize(query);
    return this.repo.pagedAsync(filter);
  }
}
