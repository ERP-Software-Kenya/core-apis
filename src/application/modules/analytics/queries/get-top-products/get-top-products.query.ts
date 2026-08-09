import { QueryBase } from 'src/common';

export class GetTopProductsQuery extends QueryBase {
  public organizationId: string;
  public limit: number;
}
