import { AutoMap } from '@automapper/classes';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsNumber, IsOptional, Min } from 'class-validator';

export class UpsertBranchProductPriceRequest {
  @ApiPropertyOptional() @IsOptional() @IsNumber() @Min(0) @AutoMap() public costPrice?: number | null;
  @ApiPropertyOptional() @IsOptional() @IsNumber() @Min(0) @AutoMap() public retailPrice?: number | null;
  @ApiPropertyOptional() @IsOptional() @IsNumber() @Min(0) @AutoMap() public loyaltyPrice?: number | null;
  @ApiPropertyOptional() @IsOptional() @IsNumber() @Min(0) @AutoMap() public wholesalePrice?: number | null;
  @ApiPropertyOptional() @IsOptional() @IsNumber() @Min(0) @AutoMap() public transferPrice?: number | null;
}
