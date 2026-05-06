import { AutoMap } from '@automapper/classes';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class StockMovementResponse {
  @ApiProperty() @AutoMap() public id: string;
  @ApiProperty() @AutoMap() public organizationId: string;
  @ApiProperty() @AutoMap() public inventoryId: string;
  @ApiPropertyOptional() @AutoMap() public userId?: string;
  @ApiProperty() @AutoMap() public quantity: number;
  @ApiProperty() @AutoMap() public type: string;
  @ApiPropertyOptional() @AutoMap() public reason?: string;
}
