import { AutoMap } from '@automapper/classes';
import { EOrder, Filter, QueryBase } from 'src/common';
import { ELocationType } from 'src/infrastructure/persistence/entities';
import { LocationFilter } from '../../domain';

export class ListLocationsQuery extends QueryBase implements Filter<LocationFilter> {
  @AutoMap() public organizationId?: string;
  @AutoMap(() => String) public type?: ELocationType;
  @AutoMap() public isActive?: boolean;
  @AutoMap(() => Array) public $ids?: string[];
  @AutoMap() public $orderBy?: string;
  @AutoMap(() => String) public $order?: EOrder;
}
