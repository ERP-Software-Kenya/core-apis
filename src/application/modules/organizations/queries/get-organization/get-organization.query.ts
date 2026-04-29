import { AutoMap } from '@automapper/classes';
import { QueryBase } from '../../../../../common';

export class GetOrganizationQuery extends QueryBase {
  @AutoMap() public id: string;
}
