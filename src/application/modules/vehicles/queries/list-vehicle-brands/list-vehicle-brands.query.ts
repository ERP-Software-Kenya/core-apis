import { AutoMap } from '@automapper/classes';
import { QueryBase } from 'src/common';

export class ListVehicleBrandsQuery extends QueryBase {
  @AutoMap(() => Array) public $ids?: string[];
}
