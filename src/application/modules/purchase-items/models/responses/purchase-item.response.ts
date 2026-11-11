import { AutoMap } from '@automapper/classes';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class PurchaseItemResponse {
  @ApiProperty() @AutoMap() public id: string;
  @ApiProperty() @AutoMap() public purchaseOrderId: string;
  @ApiProperty() @AutoMap() public productId: string;
  @ApiProperty() @AutoMap() public quantityOrdered: number;
  @ApiPropertyOptional() @AutoMap() public productUnitId?: string;
  @ApiPropertyOptional() @AutoMap() public selectedUnitId?: string;
  @ApiPropertyOptional() @AutoMap() public selectedUnitNameSnapshot?: string;
  @ApiPropertyOptional() @AutoMap() public selectedUnitSymbolSnapshot?: string;
  @ApiPropertyOptional() @AutoMap() public enteredQuantity?: string;
  @ApiPropertyOptional() @AutoMap() public conversionFactorSnapshot?: string;
  @ApiPropertyOptional() @AutoMap() public baseUnitId?: string;
  @ApiPropertyOptional() @AutoMap() public selectedUnitCost?: number;
  @ApiProperty() @AutoMap() public quantityReceived: number;
  @ApiProperty() @AutoMap() public quantityAllocated: number;
  @ApiProperty() @AutoMap() public unitCost: number;
  @ApiProperty() @AutoMap() public totalCost: number;
  @ApiPropertyOptional() @AutoMap() public packQuantity?: number;
  @ApiPropertyOptional() @AutoMap() public packSizeSnapshot?: number;
  @ApiPropertyOptional() @AutoMap(() => Date) public createdAt?: Date;
  @ApiPropertyOptional() @AutoMap(() => Date) public updatedAt?: Date;
}
