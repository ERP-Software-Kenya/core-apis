import { ApiProperty } from '@nestjs/swagger';

export class PurchaseTrendPointResponse {
  @ApiProperty()
  public month: string;

  @ApiProperty()
  public spend: number;

  @ApiProperty()
  public poCount: number;
}
