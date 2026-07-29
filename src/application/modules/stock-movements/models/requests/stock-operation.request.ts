import { AutoMap } from '@automapper/classes';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsPositive, IsString } from 'class-validator';

export class StockOperationRequest {
  @ApiProperty() @IsNotEmpty() @IsString() @AutoMap() public inventoryId: string;
  @ApiProperty() @IsNotEmpty() @IsString() @AutoMap() public locationId: string;
  @ApiProperty() @IsNotEmpty() @IsString() @AutoMap() public productId: string;
  @ApiProperty() @IsNumber() @IsPositive() @AutoMap() public quantity: number;
  @ApiPropertyOptional() @IsOptional() @IsNumber() @IsPositive() @AutoMap() public unitCost?: number;
  @ApiPropertyOptional() @IsOptional() @IsString() @AutoMap() public referenceId?: string;
  @ApiPropertyOptional() @IsOptional() @IsString() @AutoMap() public referenceType?: string;
  @ApiPropertyOptional() @IsOptional() @IsString() @AutoMap() public notes?: string;
}

export class AdjustStockRequest {
  @ApiProperty() @IsNotEmpty() @IsString() @AutoMap() public inventoryId: string;
  @ApiProperty() @IsNotEmpty() @IsString() @AutoMap() public locationId: string;
  @ApiProperty() @IsNotEmpty() @IsString() @AutoMap() public productId: string;
  @ApiProperty() @IsNumber() @AutoMap() public absoluteQuantity: number;
  @ApiPropertyOptional() @IsOptional() @IsNumber() @IsPositive() @AutoMap() public unitCost?: number;
  @ApiPropertyOptional() @IsOptional() @IsString() @AutoMap() public notes?: string;
}

