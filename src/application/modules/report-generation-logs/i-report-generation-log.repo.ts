import { IBaseRepo, Filter, PageableFilter } from '../../../common';
import { ReportGenerationLog, ReportGenerationLogFilter } from './domain';

export const REPORT_GENERATION_LOG_REPO = 'REPORT_GENERATION_LOG_REPO';

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface IReportGenerationLogRepo extends IBaseRepo<ReportGenerationLog, string, PageableFilter<ReportGenerationLogFilter>, Filter<ReportGenerationLogFilter>> {}
