import { AutoMap } from '@automapper/classes';
import { QueryBase } from 'src/common';

export class GetBranchQuery extends QueryBase {
  @AutoMap() public id: string;
}
