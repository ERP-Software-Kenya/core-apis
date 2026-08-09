import { ApiProperty } from '@nestjs/swagger';

export class PurchaseSummaryResponse {
  @ApiProperty()
  public spendThisMonth: number;

  @ApiProperty()
  public outstandingPos: number;

  @ApiProperty()
  public avgPoValue: number;

  @ApiProperty()
  public supplierCount: number;
}
