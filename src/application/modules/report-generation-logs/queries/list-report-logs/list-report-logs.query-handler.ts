import { Inject } from '@nestjs/common';
import type { IQueryHandler } from '@nestjs/cqrs';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { QueryHandlerStrict, IFilterNormalizer } from '../../../../../common';
import { REPORT_GENERATION_LOG_REPO } from '../../../../constants';
import { ReportGenerationLog, ReportGenerationLogFilter } from '../../domain';
import { IReportGenerationLogRepo } from '../..';
import { ReportGenerationLogFilterNormalizer } from '../../helpers';
import { ListReportLogsQuery } from './list-report-logs.query';

@QueryHandlerStrict(ListReportLogsQuery)
export class ListReportLogsQueryHandler implements IQueryHandler<ListReportLogsQuery, ReportGenerationLog[]> {
  constructor(
    @Inject(REPORT_GENERATION_LOG_REPO) protected readonly repo: IReportGenerationLogRepo,
    @Inject(ReportGenerationLogFilterNormalizer) protected readonly filterNormalizer: IFilterNormalizer<ReportGenerationLogFilter>,
    @InjectPinoLogger(ListReportLogsQueryHandler.name) protected readonly logger: PinoLogger,
  ) {}

  public async execute(query: ListReportLogsQuery): Promise<ReportGenerationLog[]> {
    this.logger.info(`Executing Query "${ListReportLogsQuery.name}"`);
    const filter = this.filterNormalizer.normalize(query);
    return this.repo.allAsync(filter);
  }
}
