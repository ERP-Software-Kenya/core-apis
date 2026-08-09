import { ApiProperty } from '@nestjs/swagger';

export class TopCustomerResponse {
  @ApiProperty({ nullable: true })
  public customerId: string | null;

  @ApiProperty()
  public customerName: string;

  @ApiProperty()
  public totalSpend: number;

  @ApiProperty()
  public billCount: number;
}
