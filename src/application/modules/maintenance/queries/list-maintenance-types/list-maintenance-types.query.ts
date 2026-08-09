import { AutoMap } from '@automapper/classes';
import { QueryBase } from 'src/common';

export class ListMaintenanceTypesQuery extends QueryBase {
  @AutoMap(() => Array) public $ids?: string[];
}
