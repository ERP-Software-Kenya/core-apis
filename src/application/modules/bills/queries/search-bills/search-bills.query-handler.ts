import { Inject } from '@nestjs/common';
import type { IQueryHandler } from '@nestjs/cqrs';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { QueryHandlerStrict, IFilterNormalizer, IPageable } from '../../../../../common';
import { BILL_REPO } from '../../../../constants';
import { Bill, BillFilter } from '../../domain';
import { IBillRepo } from '../..';
import { SearchBillsQuery } from './search-bills.query';
import { BillFilterNormalizer } from '../../helpers';

@QueryHandlerStrict(SearchBillsQuery)
export class SearchBillsQueryHandler implements IQueryHandler<SearchBillsQuery, IPageable<Bill>> {
  constructor(
    @Inject(BILL_REPO) protected readonly repo: IBillRepo,
    @Inject(BillFilterNormalizer) protected readonly filterNormalizer: IFilterNormalizer<BillFilter>,
    @InjectPinoLogger(SearchBillsQueryHandler.name) protected readonly logger: PinoLogger,
  ) {}

  public async execute(query: SearchBillsQuery): Promise<IPageable<Bill>> {
    this.logger.info(`Executing Query "${SearchBillsQuery.name}"`);
    const filter = this.filterNormalizer.pageableNormalize(query);
    return this.repo.pagedAsync(filter);
  }
}
