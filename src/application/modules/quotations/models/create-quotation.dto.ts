import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsArray,
  ArrayMaxSize,
  ArrayMinSize,
  Max,
  MaxLength,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  IsUUID,
  Min,
  ValidateNested,
} from 'class-validator';

export class CreateQuotationItemDto {
  @ApiProperty({ description: 'Product UUID' })
  @IsUUID()
  @IsNotEmpty()
  public productId: string;

  @ApiPropertyOptional({ description: 'Variant UUID' })
  @IsUUID()
  @IsOptional()
  public variantId?: string;

  @ApiProperty({ description: 'Quantity', example: 1 })
  @IsNumber()
  @IsPositive()
  public quantity: number;

  @ApiProperty({ description: 'Tax-inclusive unit price', example: 100 })
  @IsNumber()
  @Min(0)
  public unitPriceInclusive: number;

  @ApiPropertyOptional({ description: 'Statutory GST tax rate % (e.g. 18 for 18%)', example: 18 })
  @IsNumber()
  @IsOptional()
  @Min(0)
  @Max(100)
  public taxRate?: number;
}

export class CreateQuotationDto {
  @ApiProperty({ description: 'Location UUID' })
  @IsUUID()
  @IsNotEmpty()
  public locationId: string;

  @ApiProperty({ description: 'Customer UUID' })
  @IsUUID()
  @IsNotEmpty()
  public customerId: string;

  @ApiPropertyOptional({ description: 'Notes' })
  @IsString()
  @IsOptional()
  @MaxLength(5000)
  public notes?: string;

  @ApiProperty({ type: [CreateQuotationItemDto], description: 'Quotation items' })
  @IsArray()
  @ArrayMinSize(1)
  @ArrayMaxSize(500)
  @ValidateNested({ each: true })
  @Type(() => CreateQuotationItemDto)
  public items: CreateQuotationItemDto[];
}
