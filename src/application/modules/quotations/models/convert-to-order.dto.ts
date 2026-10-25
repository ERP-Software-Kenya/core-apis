import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsOptional, IsUUID } from 'class-validator';
import { EFulfillmentMode } from '../../../shared/enums/e-fulfillment-mode';

export class ConvertToOrderDto {
  @ApiPropertyOptional({ enum: EFulfillmentMode, default: EFulfillmentMode.Delivery })
  @IsEnum(EFulfillmentMode)
  @IsOptional()
  public fulfillmentMode?: EFulfillmentMode;

  @ApiPropertyOptional({ description: 'Fulfillment location UUID' })
  @IsUUID()
  @IsOptional()
  public fulfillmentLocationId?: string;
}
