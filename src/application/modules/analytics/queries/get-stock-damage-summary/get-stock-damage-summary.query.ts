import { QueryBase } from 'src/common';

export class GetStockDamageSummaryQuery extends QueryBase {
  public organizationId: string;
  public from: Date;
  public to: Date;
  public branchId?: string;
  public locationId?: string;
  public locationIds?: string[];
  public limit: number;
}
