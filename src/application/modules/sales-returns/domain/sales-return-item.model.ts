import { AutoMap } from '@automapper/classes';
import { ESalesReturnItemCondition } from '../../../../infrastructure/persistence/entities';

export class SalesReturnItem {
  @AutoMap() public id: string;
  @AutoMap() public salesReturnId: string;
  @AutoMap() public billItemId: string;
  @AutoMap() public productId: string;
  @AutoMap() public variantId?: string;
  @AutoMap() public quantity: number;
  @AutoMap() public unitPrice: number;
  @AutoMap() public taxRate: number;
  @AutoMap() public taxAmount: number;
  @AutoMap() public discountAmount: number;
  @AutoMap() public lineTotal: number;
  @AutoMap(() => String) public condition: ESalesReturnItemCondition;
  @AutoMap() public reason?: string;
  @AutoMap(() => Date) public createdAt?: Date;
  @AutoMap(() => Date) public updatedAt?: Date;
}
