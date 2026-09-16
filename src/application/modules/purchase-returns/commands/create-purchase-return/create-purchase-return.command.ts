import { AutoMap } from '@automapper/classes';
import { EPurchaseReturnItemSourceType } from '../../../../../infrastructure/persistence/entities';

export class CreatePurchaseReturnItemCommand {
  @AutoMap() public purchaseItemId: string;
  @AutoMap() public quantity: number;
  @AutoMap(() => String) public sourceType: EPurchaseReturnItemSourceType;
  @AutoMap() public locationId?: string;
  @AutoMap() public reason?: string;
}

export class CreatePurchaseReturnCommand {
  @AutoMap() public purchaseOrderId: string;
  @AutoMap() public reason?: string;
  @AutoMap() public notes?: string;
  @AutoMap(() => [CreatePurchaseReturnItemCommand]) public items: CreatePurchaseReturnItemCommand[];
  public organizationId: string;
  public createdById?: string;
}
