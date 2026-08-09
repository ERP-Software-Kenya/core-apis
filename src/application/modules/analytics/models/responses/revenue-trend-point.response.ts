import { ApiProperty } from '@nestjs/swagger';

export class RevenueTrendPointResponse {
  @ApiProperty()
  public month: string;

  @ApiProperty()
  public revenue: number;

  @ApiProperty()
  public billCount: number;
}
