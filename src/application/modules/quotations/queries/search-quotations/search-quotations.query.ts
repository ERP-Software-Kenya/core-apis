import { QueryBase } from '../../../../../common';

export class SearchQuotationsQuery extends QueryBase {
  public organizationId?: string;
  public locationId?: string;
  public customerId?: string;
  public status?: string;
  public isLatest?: boolean;
  public search?: string;
  public $page?: number;
  public $perPage?: number;
}
