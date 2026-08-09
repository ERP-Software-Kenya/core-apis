import { QueryBase } from 'src/common';

export class GetPurchaseTrendQuery extends QueryBase {
  public organizationId: string;
  public months: number;
}
