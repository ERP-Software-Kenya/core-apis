import { AutoMap } from '@automapper/classes';
import { QueryBase } from 'src/common';

export class ListVehicleTypesQuery extends QueryBase {
  @AutoMap(() => Array) public $ids?: string[];
}
