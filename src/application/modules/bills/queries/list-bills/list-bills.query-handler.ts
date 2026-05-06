import { Inject } from '@nestjs/common';
import type { IQueryHandler } from '@nestjs/cqrs';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { QueryHandlerStrict, IFilterNormalizer } from '../../../../../common';
import { BILL_REPO } from '../../../../constants';
import { Bill, BillFilter } from '../../domain';
import { IBillRepo } from '../../index';
import { BillFilterNormalizer } from '../../helpers';
import { ListBillsQuery } from './list-bills.query';

@QueryHandlerStrict(ListBillsQuery)
export class ListBillsQueryHandler implements IQueryHandler<ListBillsQuery, Bill[]> {
  constructor(
    @Inject(BILL_REPO) protected readonly repo: IBillRepo,
    @Inject(BillFilterNormalizer) protected readonly filterNormalizer: IFilterNormalizer<BillFilter>,
    @InjectPinoLogger(ListBillsQueryHandler.name) protected readonly logger: PinoLogger,
  ) {}

  public async execute(query: ListBillsQuery): Promise<Bill[]> {
    this.logger.info(`Executing Query "${ListBillsQuery.name}"`);
    const filter = this.filterNormalizer.normalize(query);
    return this.repo.allAsync(filter);
  }
}
