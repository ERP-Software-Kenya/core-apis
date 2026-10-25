import { AutoMap } from '@automapper/classes';
import { EPurchaseReturnItemSourceType } from '../../../../infrastructure/persistence/entities';

export class PurchaseReturnItem {
  @AutoMap() public id: string;
  @AutoMap() public purchaseReturnId: string;
  @AutoMap() public purchaseItemId: string;
  @AutoMap() public productId: string;
  @AutoMap() public quantity: number;
  @AutoMap() public unitCost: number;
  @AutoMap() public lineTotal: number;
  @AutoMap(() => String) public sourceType: EPurchaseReturnItemSourceType;
  @AutoMap() public locationId?: string;
  @AutoMap() public reason?: string;
  @AutoMap(() => Date) public createdAt?: Date;
  @AutoMap(() => Date) public updatedAt?: Date;
}
