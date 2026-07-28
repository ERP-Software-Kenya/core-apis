import { AutoMap } from '@automapper/classes';
import { PageableFilter } from 'src/common';
import { LocationFilter } from '../../domain';
import { ListLocationsQuery } from '../list-locations/list-locations.query';

export class SearchLocationsQuery extends ListLocationsQuery implements PageableFilter<LocationFilter> {
  @AutoMap() public $page?: number;
  @AutoMap() public $perPage?: number;
}
