import { ApiProperty } from '@nestjs/swagger';

export class FinancialKpisResponse {
  @ApiProperty()
  totalFuelCost: number;

  @ApiProperty()
  totalMaintenanceCost: number;

  @ApiProperty()
  totalExpenses: number;
}
