import { QueryBase } from 'src/common';

export class GetTopCustomersQuery extends QueryBase {
  public organizationId: string;
  public limit: number;
}
