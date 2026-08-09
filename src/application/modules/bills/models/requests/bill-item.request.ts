import { AutoMap } from '@automapper/classes';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNumber, IsOptional, IsUUID, Min } from 'class-validator';

export class CreateBillItemRequest {
  @ApiProperty() @IsUUID() @AutoMap() public productId: string;
  @ApiPropertyOptional() @IsOptional() @IsUUID() @AutoMap() public variantId?: string;
  @ApiProperty() @Type(() => Number) @IsNumber() @Min(0) @AutoMap() public quantity: number;
  @ApiProperty() @Type(() => Number) @IsNumber() @Min(0) @AutoMap() public unitPrice: number;
  @ApiPropertyOptional({ default: 0 }) @IsOptional() @Type(() => Number) @IsNumber() @Min(0) @AutoMap() public taxRate?: number;
  @ApiPropertyOptional({ default: 0 }) @IsOptional() @Type(() => Number) @IsNumber() @Min(0) @AutoMap() public discountAmount?: number;
}

/** Every field optional — a partial patch of a single bill line. */
export class UpdateBillItemRequest {
  @ApiPropertyOptional() @IsOptional() @IsUUID() @AutoMap() public productId?: string;
  @ApiPropertyOptional() @IsOptional() @IsUUID() @AutoMap() public variantId?: string;
  @ApiPropertyOptional() @IsOptional() @Type(() => Number) @IsNumber() @Min(0) @AutoMap() public quantity?: number;
  @ApiPropertyOptional() @IsOptional() @Type(() => Number) @IsNumber() @Min(0) @AutoMap() public unitPrice?: number;
  @ApiPropertyOptional() @IsOptional() @Type(() => Number) @IsNumber() @Min(0) @AutoMap() public taxRate?: number;
  @ApiPropertyOptional() @IsOptional() @Type(() => Number) @IsNumber() @Min(0) @AutoMap() public discountAmount?: number;
}
