import { AutoMap } from '@automapper/classes';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { EMovementType } from 'src/infrastructure/persistence/entities';

export class StockMovementResponse {
  @ApiProperty() @AutoMap() public id: string;
  @ApiProperty() @AutoMap() public inventoryId: string;
  @ApiProperty() @AutoMap() public locationId: string;
  @ApiProperty() @AutoMap() public productId: string;
  @ApiPropertyOptional() @AutoMap() public performedById?: string;
  @ApiPropertyOptional() @AutoMap() public referenceId?: string;
  @ApiPropertyOptional() @AutoMap() public referenceType?: string;
  @ApiProperty({ enum: EMovementType }) @AutoMap(() => String) public movementType: EMovementType;
  @ApiProperty() @AutoMap() public quantity: number;
  @ApiPropertyOptional() @AutoMap() public productUnitId?: string;
  @ApiPropertyOptional() @AutoMap() public selectedUnitId?: string;
  @ApiPropertyOptional() @AutoMap() public selectedUnitNameSnapshot?: string;
  @ApiPropertyOptional() @AutoMap() public selectedUnitSymbolSnapshot?: string;
  @ApiPropertyOptional() @AutoMap() public enteredQuantity?: string;
  @ApiPropertyOptional() @AutoMap() public conversionFactorSnapshot?: string;
  @ApiPropertyOptional() @AutoMap() public baseUnitId?: string;
  @ApiProperty() @AutoMap() public quantityBefore: number;
  @ApiProperty() @AutoMap() public quantityAfter: number;
  @ApiPropertyOptional() @AutoMap() public unitCost?: number;
  @ApiPropertyOptional() @AutoMap() public notes?: string;
  @ApiPropertyOptional() @AutoMap(() => Date) public createdAt?: Date;
}
