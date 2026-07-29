import { AutoMap } from '@automapper/classes';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class ProductSupplierResponse {
  @ApiProperty() @AutoMap() public id: string;
  @ApiProperty() @AutoMap() public productId: string;
  @ApiProperty() @AutoMap() public supplierId: string;
  @ApiProperty() @AutoMap() public isDefault: boolean;
  @ApiPropertyOptional() @AutoMap() public unitCost?: number;
  @ApiPropertyOptional() @AutoMap() public leadTimeDays?: number;
  @ApiPropertyOptional() @AutoMap() public minOrderQty?: number;
  @ApiProperty() @AutoMap(() => Date) public createdAt: Date;
  @ApiPropertyOptional() @AutoMap(() => Date) public updatedAt?: Date;
}
