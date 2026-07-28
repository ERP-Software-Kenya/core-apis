import { AutoMap } from '@automapper/classes';
import { QueryBase } from 'src/common';

export class ListLogsByInventoryQuery extends QueryBase {
  @AutoMap() public inventoryId: string;
}
