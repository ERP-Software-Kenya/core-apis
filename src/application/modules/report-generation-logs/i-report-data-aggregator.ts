import { BuildReportParams, ReportData } from './domain';

export const REPORT_DATA_AGGREGATOR = 'IReportDataAggregator';

export interface IReportDataAggregator {
  aggregate(params: BuildReportParams): Promise<ReportData>;
}
