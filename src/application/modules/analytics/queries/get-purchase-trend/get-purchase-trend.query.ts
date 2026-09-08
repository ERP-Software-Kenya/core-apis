import { QueryBase } from 'src/common';
import type { AnalyticsTrunc } from '../../analytics-period.util';

export class GetPurchaseTrendQuery extends QueryBase {
  public organizationId: string;
  public from: Date;
  public to: Date;
  public branchId?: string;
  public locationId?: string;
  public locationIds?: string[];
  public trunc?: AnalyticsTrunc;
}
