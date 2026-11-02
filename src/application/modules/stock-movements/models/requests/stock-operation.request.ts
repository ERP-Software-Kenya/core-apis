import { AutoMap } from '@automapper/classes';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsArray, IsNotEmpty, IsNumber, IsOptional, IsPositive, IsString, IsUUID, Min, ValidateNested } from 'class-validator';

export class StockQuantityComponentRequest {
  @ApiProperty() @IsUUID() public productUnitId: string;
  @ApiProperty() @IsNumber() @IsPositive() public quantity: number;
}

export class StockOperationRequest {
  @ApiProperty() @IsNotEmpty() @IsString() @AutoMap() public inventoryId: string;
  @ApiProperty() @IsNotEmpty() @IsString() @AutoMap() public locationId: string;
  @ApiProperty() @IsNotEmpty() @IsString() @AutoMap() public productId: string;
  @ApiPropertyOptional() @IsOptional() @IsNumber() @IsPositive() @AutoMap() public quantity?: number;
  @ApiPropertyOptional({ description: 'Product-unit conversion ID. When omitted, quantity is already in the base unit.' })
  @IsOptional() @IsUUID() @AutoMap() public productUnitId?: string;
  @ApiPropertyOptional({ type: [StockQuantityComponentRequest], description: 'Mixed-unit components, e.g. 5 Bags and 18 KG.' })
  @IsOptional() @IsArray() @ValidateNested({ each: true }) @Type(() => StockQuantityComponentRequest)
  public quantityComponents?: StockQuantityComponentRequest[];
  @ApiPropertyOptional() @IsOptional() @IsNumber() @IsPositive() @AutoMap() public unitCost?: number;
  @ApiPropertyOptional() @IsOptional() @IsString() @AutoMap() public referenceId?: string;
  @ApiPropertyOptional() @IsOptional() @IsString() @AutoMap() public referenceType?: string;
  @ApiPropertyOptional() @IsOptional() @IsString() @AutoMap() public notes?: string;
}

export class AdjustStockRequest {
  @ApiProperty() @IsNotEmpty() @IsString() @AutoMap() public inventoryId: string;
  @ApiProperty() @IsNotEmpty() @IsString() @AutoMap() public locationId: string;
  @ApiProperty() @IsNotEmpty() @IsString() @AutoMap() public productId: string;
  @ApiProperty() @IsNumber() @Min(0) @AutoMap() public absoluteQuantity: number;
  @ApiPropertyOptional() @IsOptional() @IsNumber() @IsPositive() @AutoMap() public unitCost?: number;
  @ApiPropertyOptional() @IsOptional() @IsString() @AutoMap() public notes?: string;
}

