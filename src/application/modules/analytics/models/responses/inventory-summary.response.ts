import { ApiProperty } from '@nestjs/swagger';

export class InventorySummaryResponse {
  @ApiProperty() public totalSkus: number;
  @ApiProperty() public lowStockCount: number;
  @ApiProperty() public zeroStockCount: number;
  @ApiProperty() public totalValuation: number;
}
