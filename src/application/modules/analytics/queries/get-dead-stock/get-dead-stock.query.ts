import { QueryBase } from 'src/common';

export class GetDeadStockQuery extends QueryBase {
  public organizationId: string;
  public from?: Date;
  public to?: Date;
  public branchId?: string;
  public locationId?: string;
  public locationIds?: string[];
  public limit: number;
  /** Days without a completed sale to classify as dead stock. */
  public staleDays: number;
}
