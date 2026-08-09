import { AutoMap } from '@automapper/classes';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsNumber, IsOptional, Min } from 'class-validator';

export class UpdateBillItemRequest {
  @ApiPropertyOptional() @IsOptional() @IsNumber() @Min(0) @AutoMap() public quantity?: number;
  @ApiPropertyOptional() @IsOptional() @IsNumber() @Min(0) @AutoMap() public unitPrice?: number;
  @ApiPropertyOptional() @IsOptional() @IsNumber() @AutoMap() public taxRate?: number;
  @ApiPropertyOptional() @IsOptional() @IsNumber() @AutoMap() public discountAmount?: number;
}
