import { AutoMap } from '@automapper/classes';
import { QueryBase } from '../../../../common';

export class GetVehicleExpenseQuery extends QueryBase {
  @AutoMap() public id: string;
}

