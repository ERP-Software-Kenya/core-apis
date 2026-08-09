import { AutoMap } from '@automapper/classes';
import { QueryBase } from 'src/common';

export class GetVehicleQuery extends QueryBase {
  @AutoMap() public id: string;
}
