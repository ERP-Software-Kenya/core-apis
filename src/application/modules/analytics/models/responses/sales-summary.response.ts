import { ApiProperty } from '@nestjs/swagger';

export class SalesSummaryResponse {
  @ApiProperty()
  public revenueThisMonth: number;

  @ApiProperty()
  public revenueThisWeek: number;

  @ApiProperty()
  public avgBillValue: number;

  @ApiProperty()
  public activeCustomers: number;

  @ApiProperty()
  public completedBills: number;

  @ApiProperty()
  public pendingBills: number;
}
