import { AutoMap } from '@automapper/classes';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsArray, IsDateString, IsNotEmpty, IsNumber, IsOptional, IsString, IsUUID, Min, ValidateNested } from 'class-validator';

export class CreateUnpublishedStockPOItemRequest {
  @ApiProperty() @IsNotEmpty() @IsUUID() public productId: string;
  @ApiProperty() @IsNotEmpty() @IsNumber() @Min(0.0001) public quantityOrdered: number;
  @ApiProperty() @IsNotEmpty() @IsNumber() @Min(0) public unitCost: number;
}

export class CreateUnpublishedStockPORequest {
  @ApiProperty() @IsNotEmpty() @IsUUID() @AutoMap() public supplierId: string;
  @ApiPropertyOptional() @IsOptional() @IsDateString() @AutoMap() public expectedAt?: string;
  @ApiPropertyOptional() @IsOptional() @IsString() @AutoMap() public notes?: string;

  @ApiProperty({ type: [CreateUnpublishedStockPOItemRequest] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateUnpublishedStockPOItemRequest)
  public items: CreateUnpublishedStockPOItemRequest[];
}
