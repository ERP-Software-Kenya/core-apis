import { AutoMap } from '@automapper/classes';
import { PageableFilter } from 'src/common';
import { ListTripsQuery } from '../list-trips/list-trips.query';
import { Trip } from '../../domain';

export class SearchTripsQuery extends ListTripsQuery implements PageableFilter<Trip, string> {
  @AutoMap() public $page?: number;
  @AutoMap() public $perPage?: number;
}
