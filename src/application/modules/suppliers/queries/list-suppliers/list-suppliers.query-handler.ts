import { Inject } from '@nestjs/common';
import type { IQueryHandler } from '@nestjs/cqrs';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { QueryHandlerStrict } from '../../../../../common';
import { IFilterNormalizer } from '../../../../../common';
import { Supplier, SupplierFilter } from '../../domain';
import { ISupplierRepo } from '../..';
import { SupplierFilterNormalizer } from '../../helpers';
import { ListSuppliersQuery } from './list-suppliers.query';
import { SUPPLIER_REPO } from '../../../../constants';

@QueryHandlerStrict(ListSuppliersQuery)
export class ListSuppliersQueryHandler implements IQueryHandler<ListSuppliersQuery, Supplier[]> {
  constructor(
    @Inject(SUPPLIER_REPO) protected readonly repo: ISupplierRepo,
    @Inject(SupplierFilterNormalizer) protected readonly filterNormalizer: IFilterNormalizer<SupplierFilter>,
    @InjectPinoLogger(ListSuppliersQueryHandler.name) protected readonly logger: PinoLogger,
  ) {}

  public async execute(query: ListSuppliersQuery): Promise<Supplier[]> {
    this.logger.info(`Executing Query "${ListSuppliersQuery.name}"`);
    const filter = this.filterNormalizer.normalize(query);
    return this.repo.allAsync(filter);
  }
}
