import { AutoMap } from '@automapper/classes';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsNumber, IsOptional, IsUUID, Min } from 'class-validator';

export class LinkProductSupplierRequest {
  @ApiProperty() @IsNotEmpty() @IsUUID() @AutoMap() public supplierId: string;
  @ApiPropertyOptional() @IsOptional() @IsBoolean() @AutoMap() public isDefault?: boolean;
  @ApiPropertyOptional() @IsOptional() @IsNumber() @Min(0) @AutoMap() public unitCost?: number;
  @ApiPropertyOptional() @IsOptional() @IsNumber() @Min(0) @AutoMap() public leadTimeDays?: number;
  @ApiPropertyOptional() @IsOptional() @IsNumber() @Min(0) @AutoMap() public minOrderQty?: number;
}
