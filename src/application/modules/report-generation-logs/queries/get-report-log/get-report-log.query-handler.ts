import { Inject } from '@nestjs/common';
import type { IQueryHandler } from '@nestjs/cqrs';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { QueryHandlerStrict } from '../../../../../common';
import { REPORT_GENERATION_LOG_REPO } from '../../../../constants';
import { ReportGenerationLog } from '../../domain';
import { IReportGenerationLogRepo } from '../..';
import { GetReportLogQuery } from './get-report-log.query';

@QueryHandlerStrict(GetReportLogQuery)
export class GetReportLogQueryHandler implements IQueryHandler<GetReportLogQuery, ReportGenerationLog> {
  constructor(
    @Inject(REPORT_GENERATION_LOG_REPO) protected readonly repo: IReportGenerationLogRepo,
    @InjectPinoLogger(GetReportLogQueryHandler.name) protected readonly logger: PinoLogger,
  ) {}

  public async execute(query: GetReportLogQuery): Promise<ReportGenerationLog> {
    this.logger.info(`Executing Query "${GetReportLogQuery.name}"`);
    return this.repo.getAsync(query.id);
  }
}
