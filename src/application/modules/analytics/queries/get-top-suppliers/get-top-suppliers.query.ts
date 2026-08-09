import { QueryBase } from 'src/common';

export class GetTopSuppliersQuery extends QueryBase {
  public organizationId: string;
  public limit: number;
}
