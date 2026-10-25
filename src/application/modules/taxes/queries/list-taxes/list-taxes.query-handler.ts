import { Inject } from '@nestjs/common';
import type { IQueryHandler } from '@nestjs/cqrs';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { QueryHandlerStrict } from '../../../../../common';
import { TAX_REPO } from '../../../../constants';
import { Tax, TaxFilter } from '../../domain';
import { ITaxRepo } from '../../i-tax.repo';
import { ListTaxesQuery } from './list-taxes.query';

@QueryHandlerStrict(ListTaxesQuery)
export class ListTaxesQueryHandler implements IQueryHandler<ListTaxesQuery, Tax[]> {
  constructor(
    @Inject(TAX_REPO) private readonly repo: ITaxRepo,
    @InjectPinoLogger(ListTaxesQueryHandler.name) private readonly logger: PinoLogger,
  ) {}

  public async execute(query: ListTaxesQuery): Promise<Tax[]> {
    this.logger.info(`Executing ${ListTaxesQuery.name}`);
    const filter = new TaxFilter();
    filter.organizationId = query.organizationId;
    filter.isActive = query.isActive;
    return this.repo.listAsync(filter);
  }
}
