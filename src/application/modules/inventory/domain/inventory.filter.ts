import { AutoMap } from '@automapper/classes';

export class InventoryFilter {
  @AutoMap() public storeId?: string;
  @AutoMap() public productId?: string;
}
