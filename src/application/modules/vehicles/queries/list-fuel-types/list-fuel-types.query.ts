import { AutoMap } from '@automapper/classes';
import { QueryBase } from 'src/common';

export class ListFuelTypesQuery extends QueryBase {
  @AutoMap(() => Array) public $ids?: string[];
}
