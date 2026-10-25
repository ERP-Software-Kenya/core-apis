import { IBaseRepo, Filter, PageableFilter } from '../../../common';
import { ReportGenerationLog, ReportGenerationLogFilter, ReportData, BuildReportParams } from './domain';

export const REPORT_GENERATION_LOG_REPO = 'REPORT_GENERATION_LOG_REPO';

export interface IReportGenerationLogRepo
  extends IBaseRepo<ReportGenerationLog, string, PageableFilter<ReportGenerationLogFilter>, Filter<ReportGenerationLogFilter>> {
  buildReportDataAsync(params: BuildReportParams): Promise<ReportData>;
}
