import { AutoMap } from '@automapper/classes';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class BillItemResponse {
  @ApiProperty() @AutoMap() public id: string;
  @ApiProperty() @AutoMap() public billId: string;
  @ApiProperty() @AutoMap() public productId: string;
  @ApiPropertyOptional() @AutoMap() public variantId?: string;
  @ApiProperty() @AutoMap() public quantity: number;
  @ApiProperty() @AutoMap() public unitPrice: number;
  @ApiProperty() @AutoMap() public taxRate: number;
  @ApiProperty() @AutoMap() public taxAmount: number;
  @ApiProperty() @AutoMap() public discountAmount: number;
  @ApiProperty() @AutoMap() public lineTotal: number;
}
