import { QueryBase } from 'src/common';

export class GetInventoryStatusQuery extends QueryBase {
  public organizationId: string;
  public from?: Date;
  public to?: Date;
  public branchId?: string;
  public locationId?: string;
  public locationIds?: string[];
  public staleDays: number;
}
