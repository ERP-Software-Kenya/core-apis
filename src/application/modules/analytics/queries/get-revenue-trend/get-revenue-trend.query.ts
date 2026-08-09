import { QueryBase } from 'src/common';

export class GetRevenueTrendQuery extends QueryBase {
  public organizationId: string;
  public months: number;
}
