import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsArray,
  ArrayMaxSize,
  ArrayMinSize,
  MaxLength,
  IsOptional,
  IsString,
  IsUUID,
  ValidateNested,
} from 'class-validator';
import { CreateQuotationItemDto } from './create-quotation.dto';

export class UpdateQuotationDto {
  @ApiPropertyOptional({ description: 'Location UUID' })
  @IsUUID()
  @IsOptional()
  public locationId?: string;

  @ApiPropertyOptional({ description: 'Customer UUID' })
  @IsUUID()
  @IsOptional()
  public customerId?: string;

  @ApiPropertyOptional({ description: 'Notes' })
  @IsString()
  @IsOptional()
  @MaxLength(5000)
  public notes?: string;

  @ApiPropertyOptional({ type: [CreateQuotationItemDto], description: 'Quotation items' })
  @IsArray()
  @ArrayMinSize(1)
  @ArrayMaxSize(500)
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => CreateQuotationItemDto)
  public items?: CreateQuotationItemDto[];
}
