import { Inject } from '@nestjs/common';
import type { IQueryHandler } from '@nestjs/cqrs';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { QueryHandlerStrict } from '../../../../../common';
import { SUPPLIER_REPO } from '../../../../constants';
import { Supplier } from '../../domain';
import { ISupplierRepo } from '../..';
import { GetSupplierQuery } from './get-supplier.query';

@QueryHandlerStrict(GetSupplierQuery)
export class GetSupplierQueryHandler implements IQueryHandler<GetSupplierQuery, Supplier> {
  constructor(
    @Inject(SUPPLIER_REPO) private readonly repo: ISupplierRepo,
    @InjectPinoLogger(GetSupplierQueryHandler.name) private readonly logger: PinoLogger,
  ) {}

  public async execute(query: GetSupplierQuery): Promise<Supplier> {
    this.logger.info(`Executing ${GetSupplierQuery.name} id=${query.id}`);
    return this.repo.getAsync(query.id);
  }
}
