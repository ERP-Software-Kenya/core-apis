import { QueryBase } from 'src/common';
import { AnalyticsPeriodPreset } from '../../analytics-period.util';

export class GetSalesSummaryQuery extends QueryBase {
  public organizationId: string;
  public from?: Date;
  public to?: Date;
  public branchId?: string;
  public locationId?: string;
  public locationIds?: string[];
  public period?: AnalyticsPeriodPreset;
}
