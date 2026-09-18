import { Inject } from '@nestjs/common';
import { IQueryHandler } from '@nestjs/cqrs';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { IPageable, QueryHandlerStrict } from '../../../../../common';
import { QUOTATION_REPO } from '../../../../constants';
import { Quotation } from '../../domain';
import { IQuotationRepo } from '../../i-quotation.repo';
import { SearchQuotationsQuery } from './search-quotations.query';

@QueryHandlerStrict(SearchQuotationsQuery)
export class SearchQuotationsQueryHandler
  implements IQueryHandler<SearchQuotationsQuery, IPageable<Quotation>>
{
  constructor(
    @Inject(QUOTATION_REPO) private readonly repo: IQuotationRepo,
    @InjectPinoLogger(SearchQuotationsQueryHandler.name)
    private readonly logger: PinoLogger,
  ) {}

  public async execute(query: SearchQuotationsQuery): Promise<IPageable<Quotation>> {
    this.logger.info(`Executing ${SearchQuotationsQuery.name}`);
    return this.repo.searchPagedAsync({
      organizationId: query.organizationId,
      locationId: query.locationId,
      customerId: query.customerId,
      status: query.status,
      isLatest: query.isLatest,
      search: query.search,
      $page: query.$page,
      $perPage: query.$perPage,
    });
  }
}
