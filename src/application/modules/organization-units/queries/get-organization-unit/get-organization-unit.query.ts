import { AutoMap } from '@automapper/classes';
import { QueryBase } from 'src/common';

export class GetOrganizationUnitQuery extends QueryBase {
  @AutoMap() public id: string;
}
