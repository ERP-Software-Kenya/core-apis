import { AutoMap } from '@automapper/classes';

export class InventoryFilter {
  @AutoMap() public organizationId?: string;
  @AutoMap() public locationId?: string;
  @AutoMap() public accessibleLocationIds?: string[];
  @AutoMap() public productId?: string;
}
