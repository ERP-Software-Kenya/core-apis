import { AutoMap } from '@automapper/classes';

export class PurchaseOrderFilter {
  @AutoMap() public storeId?: string;
  @AutoMap() public supplierId?: string;
}
