import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { ArrayMaxSize, ArrayMinSize, IsArray, IsNotEmpty, IsNumber, IsOptional, IsString, IsUUID, Min, ValidateNested } from 'class-validator';

export class ReceiveUnpublishedStockPOItemRequest {
  @ApiProperty() @IsNotEmpty() @IsUUID() public purchaseItemId: string;
  @ApiProperty() @IsNotEmpty() @IsNumber() @Min(0.0001) public quantityReceived: number;
}

export class ReceiveUnpublishedStockPORequest {
  @ApiProperty({ type: [ReceiveUnpublishedStockPOItemRequest] })
  @IsArray()
  @ArrayMinSize(1)
  @ArrayMaxSize(500)
  @ValidateNested({ each: true })
  @Type(() => ReceiveUnpublishedStockPOItemRequest)
  public items: ReceiveUnpublishedStockPOItemRequest[];

  @ApiPropertyOptional() @IsOptional() @IsString() public notes?: string;
}
