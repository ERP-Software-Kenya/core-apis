import { Inject } from '@nestjs/common';
import type { IQueryHandler } from '@nestjs/cqrs';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { QueryHandlerStrict, IFilterNormalizer, IPageable } from '../../../../../common';
import { REPORT_GENERATION_LOG_REPO } from '../../../../constants';
import { ReportGenerationLog, ReportGenerationLogFilter } from '../../domain';
import { IReportGenerationLogRepo } from '../..';
import { ReportGenerationLogFilterNormalizer } from '../../helpers';
import { SearchReportLogsQuery } from './search-report-logs.query';

@QueryHandlerStrict(SearchReportLogsQuery)
export class SearchReportLogsQueryHandler implements IQueryHandler<SearchReportLogsQuery, IPageable<ReportGenerationLog>> {
  constructor(
    @Inject(REPORT_GENERATION_LOG_REPO) protected readonly repo: IReportGenerationLogRepo,
    @Inject(ReportGenerationLogFilterNormalizer) protected readonly filterNormalizer: IFilterNormalizer<ReportGenerationLogFilter>,
    @InjectPinoLogger(SearchReportLogsQueryHandler.name) protected readonly logger: PinoLogger,
  ) {}

  public async execute(query: SearchReportLogsQuery): Promise<IPageable<ReportGenerationLog>> {
    this.logger.info(`Executing Query "${SearchReportLogsQuery.name}"`);
    const filter = this.filterNormalizer.pageableNormalize(query);
    return this.repo.pagedAsync(filter);
  }
}
