import { AutoMap } from '@automapper/classes';
import { QueryBase } from 'src/common';

export class ListMovementsByInventoryQuery extends QueryBase {
  @AutoMap() public inventoryId: string;
}
