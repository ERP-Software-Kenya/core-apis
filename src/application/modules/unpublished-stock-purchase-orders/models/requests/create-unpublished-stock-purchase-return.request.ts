import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { ArrayMaxSize, ArrayMinSize, IsArray, IsNumber, IsOptional, IsString, IsUUID, Min, ValidateNested } from 'class-validator';

export class CreateUnpublishedStockPurchaseReturnItemRequest {
  @ApiProperty() @IsUUID() purchaseItemId: string;
  @ApiProperty() @IsUUID() locationId: string;
  @ApiProperty() @IsNumber() @Min(0.0001) quantity: number;
  @ApiPropertyOptional() @IsOptional() @IsString() reason?: string;
}

export class CreateUnpublishedStockPurchaseReturnRequest {
  @ApiProperty({ type: [CreateUnpublishedStockPurchaseReturnItemRequest] })
  @IsArray() @ArrayMinSize(1) @ArrayMaxSize(500) @ValidateNested({ each: true }) @Type(() => CreateUnpublishedStockPurchaseReturnItemRequest)
  items: CreateUnpublishedStockPurchaseReturnItemRequest[];
  @ApiPropertyOptional() @IsOptional() @IsString() reason?: string;
  @ApiPropertyOptional() @IsOptional() @IsString() notes?: string;
}
