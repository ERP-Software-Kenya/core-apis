import { AutoMap } from '@automapper/classes';
import { ApiProperty } from '@nestjs/swagger';

export class PurchaseItemResponse {
  @ApiProperty() @AutoMap() public id: string;
  @ApiProperty() @AutoMap() public purchaseOrderId: string;
  @ApiProperty() @AutoMap() public productId: string;
  @ApiProperty() @AutoMap() public quantity: number;
  @ApiProperty() @AutoMap() public unitPrice: number;
  @ApiProperty() @AutoMap() public totalPrice: number;
}
