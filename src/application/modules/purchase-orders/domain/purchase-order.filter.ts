import { AutoMap } from '@automapper/classes';
import { EPurchaseOrderStatus } from 'src/application/shared/enums';

export class PurchaseOrderFilter {
  @AutoMap() public organizationId?: string;
  @AutoMap() public locationId?: string;
  @AutoMap() public supplierId?: string;
  @AutoMap(() => String) public status?: EPurchaseOrderStatus;
}
