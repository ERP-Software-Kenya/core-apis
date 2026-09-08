import { QueryBase } from 'src/common';

export class GetTopProductsQuery extends QueryBase {
  public organizationId: string;
  public limit: number;
  public from?: Date;
  public to?: Date;
  public branchId?: string;
  public locationId?: string;
  public locationIds?: string[];
}
