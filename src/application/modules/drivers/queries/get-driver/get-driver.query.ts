import { AutoMap } from '@automapper/classes';
import { QueryBase } from '../../../../common';

export class GetDriverQuery extends QueryBase {
  @AutoMap() public id: string;
}
