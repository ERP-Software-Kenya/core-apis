import { AutoMap } from '@automapper/classes';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsUUID, Min } from 'class-validator';

export class CreateBillItemRequest {
  @ApiProperty() @IsUUID() @AutoMap() public productId: string;
  @ApiPropertyOptional() @IsOptional() @IsUUID() @AutoMap() public variantId?: string;
  @ApiProperty() @IsNumber() @Min(0) @AutoMap() public quantity: number;
  @ApiProperty() @IsNumber() @Min(0) @AutoMap() public unitPrice: number;
  @ApiPropertyOptional({ default: 0 }) @IsOptional() @IsNumber() @AutoMap() public taxRate?: number;
  @ApiPropertyOptional({ default: 0 }) @IsOptional() @IsNumber() @AutoMap() public discountAmount?: number;
}
