import { EReportPeriod } from './e-report-period';
import { EReportType } from './e-report-type';

export interface ReportData {
  title: string;
  description: string;
  reportPeriod: string;
  fromDateLabel: string;
  toDateLabel: string;
  orgId: string;
  reportType: string;
  fromDate: string;
  toDate: string;
  note?: string;
  formattedValue?: string;
  summaryCards?: Array<{ label: string; value: string }>;
  tableHeaders?: string[];
  tableRows?: string[][];
}

export interface BuildReportParams {
  orgId: string;
  reportType: EReportType;
  reportPeriod: EReportPeriod;
  locationId?: string | null;
  fromDate: Date;
  toDate: Date;
  reportName: string;
}
