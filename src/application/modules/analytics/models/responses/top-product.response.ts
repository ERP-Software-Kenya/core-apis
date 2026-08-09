import { ApiProperty } from '@nestjs/swagger';

export class TopProductResponse {
  @ApiProperty()
  public productId: string;

  @ApiProperty()
  public productName: string;

  @ApiProperty()
  public totalRevenue: number;

  @ApiProperty()
  public totalQtySold: number;
}
