import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class GetNextSkuRequest {
  @ApiProperty({ description: 'Product name used to derive the SKU prefix', example: 'Wireless Mouse' })
  @IsString()
  @IsNotEmpty()
  public name: string;
}
