import { AutoMap } from '@automapper/classes';
import { QueryBase } from '../../../../../common';

export class SearchTaxesQuery extends QueryBase {
  @AutoMap() public organizationId: string;
  @AutoMap() public isActive?: boolean;
  @AutoMap() public search?: string;
  @AutoMap() public page?: number;
  @AutoMap() public perPage?: number;
}
