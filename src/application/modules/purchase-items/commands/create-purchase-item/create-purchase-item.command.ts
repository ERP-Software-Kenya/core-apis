import { AutoMap } from '@automapper/classes';
import { CommandBase } from '../../../../../common';

export class CreatePurchaseItemCommand extends CommandBase {
  @AutoMap() public organizationId: string;
  @AutoMap() public purchaseOrderId: string;
  @AutoMap() public productId: string;
  @AutoMap() public productUnitId?: string;
  @AutoMap() public quantityOrdered?: number;
  @AutoMap() public unitCost: number;
  @AutoMap() public packQuantity?: number;
  @AutoMap() public packSizeSnapshot?: number;
}
