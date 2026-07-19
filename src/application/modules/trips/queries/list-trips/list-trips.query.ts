import { AutoMap } from '@automapper/classes';
import { EOrder, Filter, QueryBase } from 'src/common';
import { Trip } from '../../domain';

export class ListTripsQuery extends QueryBase implements Filter<Trip, string> {
  @AutoMap() public tripNumber?: string;
  @AutoMap() public $orderBy?: string;
  @AutoMap() public $order?: EOrder;
}
