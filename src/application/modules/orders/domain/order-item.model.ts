import { AutoMap } from '@automapper/classes';

export class OrderItem {
  @AutoMap() public id: string;
  @AutoMap() public orderId: string;
  @AutoMap() public productId: string;
  @AutoMap() public variantId?: string;
  @AutoMap() public quantity: number;
  @AutoMap() public unitPrice: number;
  @AutoMap() public taxAmount: number;
  @AutoMap() public lineTotal: number;
  @AutoMap() public packQuantity?: number;
  @AutoMap() public packSizeSnapshot?: number;
}

export type OrderItemFilter = Record<string, never>;
