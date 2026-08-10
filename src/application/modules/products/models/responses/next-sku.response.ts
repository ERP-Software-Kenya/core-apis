import { ApiProperty } from '@nestjs/swagger';

export class NextSkuResponse {
  @ApiProperty({ description: 'Suggested SKU for a new product with this name — preview only, server re-generates the authoritative SKU on create' })
  public sku: string;
}
