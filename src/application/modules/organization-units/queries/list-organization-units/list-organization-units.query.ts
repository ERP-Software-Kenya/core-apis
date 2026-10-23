import { AutoMap } from '@automapper/classes';
import { QueryBase } from 'src/common';

export class ListOrganizationUnitsQuery extends QueryBase {
  @AutoMap() public organizationId?: string;
  @AutoMap() public name?: string;
  @AutoMap() public symbol?: string;
  @AutoMap() public isActive?: boolean;
}
