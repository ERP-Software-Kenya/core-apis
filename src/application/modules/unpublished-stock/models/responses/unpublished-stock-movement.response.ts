import { AutoMap } from '@automapper/classes';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { EUnpublishedMovementType } from 'src/infrastructure/persistence/entities';

export class UnpublishedStockMovementResponse {
  @ApiProperty() @AutoMap() public id: string;
  @ApiProperty() @AutoMap() public unpublishedStockId: string;
  @ApiProperty() @AutoMap() public locationId: string;
  @ApiProperty() @AutoMap() public productId: string;
  @ApiPropertyOptional() @AutoMap() public performedById?: string;
  @ApiProperty({ enum: EUnpublishedMovementType }) @AutoMap(() => String) public movementType: EUnpublishedMovementType;
  @ApiProperty() @AutoMap() public quantity: number;
  @ApiProperty() @AutoMap() public quantityBefore: number;
  @ApiProperty() @AutoMap() public quantityAfter: number;
  @ApiPropertyOptional() @AutoMap() public unitCost?: number;
  @ApiPropertyOptional() @AutoMap() public notes?: string;
  @ApiPropertyOptional() @AutoMap(() => Date) public createdAt?: Date;
}
