import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class ProductUnitResponse {
  @ApiProperty() public unitId: string;
  @ApiPropertyOptional() public unitName?: string;
  @ApiPropertyOptional() public unitSymbol?: string;
  @ApiProperty() public isDefault: boolean;
}
