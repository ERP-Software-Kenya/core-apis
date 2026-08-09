import { ApiProperty } from '@nestjs/swagger';

export class StockByLocationPointResponse {
  @ApiProperty() public locationId: string;
  @ApiProperty() public locationName: string;
  @ApiProperty() public locationType: string;
  @ApiProperty() public totalStock: number;
  @ApiProperty() public productCount: number;
  @ApiProperty() public valuation: number;
}
