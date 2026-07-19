import { AutoMap } from '@automapper/classes';
import { PageableFilter } from 'src/common';
import { ListDriversQuery } from '../list-drivers/list-drivers.query';
import { DriverFilter } from '../../domain';

export class SearchDriversQuery extends ListDriversQuery implements PageableFilter<DriverFilter> {
  @AutoMap() public $page?: number;
  @AutoMap() public $perPage?: number;
}
