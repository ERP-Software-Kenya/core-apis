import { AutoMap } from '@automapper/classes';
import { OrderItem } from './order-item.model';

export class Order {
  @AutoMap() public id: string;
  @AutoMap() public organizationId: string;
  @AutoMap() public locationId: string;
  @AutoMap() public customerId: string;
  @AutoMap() public orderNumber: string;
  @AutoMap() public status: string;
  @AutoMap() public totalAmount: number;
  @AutoMap() public subtotal?: number;
  @AutoMap() public taxAmount?: number;
  @AutoMap() public paymentStatus?: string;
  @AutoMap() public fulfillmentMode?: string;
  @AutoMap() public fulfillmentLocationId?: string;
  @AutoMap() public claimedByUserId?: string;
  @AutoMap(() => Date) public claimedAt?: Date;
  @AutoMap() public packedByUserId?: string;
  @AutoMap(() => Date) public packedAt?: Date;
  @AutoMap(() => Date) public createdAt: Date;
  @AutoMap(() => Date) public updatedAt?: Date;
  @AutoMap(() => [OrderItem]) public items?: OrderItem[];
}
