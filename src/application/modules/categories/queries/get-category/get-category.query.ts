import { AutoMap } from '@automapper/classes';
import { QueryBase } from '../../../../../common';

export class GetCategoryQuery extends QueryBase {
  @AutoMap() public id: string;
}
