import { AutoMap } from '@automapper/classes';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsBoolean, IsNumber, IsOptional, Min } from 'class-validator';

export class UpdateProductSupplierRequest {
  @ApiPropertyOptional() @IsOptional() @IsBoolean() @AutoMap() public isDefault?: boolean;
  @ApiPropertyOptional() @IsOptional() @IsNumber() @Min(0) @AutoMap() public unitCost?: number;
  @ApiPropertyOptional() @IsOptional() @IsNumber() @Min(0) @AutoMap() public leadTimeDays?: number;
  @ApiPropertyOptional() @IsOptional() @IsNumber() @Min(0) @AutoMap() public minOrderQty?: number;
}
