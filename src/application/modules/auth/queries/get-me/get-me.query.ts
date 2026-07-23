import { QueryBase } from 'src/common';

export class GetMeQuery extends QueryBase {
  public clerkUserId: string;
  public organizationId?: string;
}
