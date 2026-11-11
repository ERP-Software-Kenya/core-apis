import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsInt, IsOptional, IsString, IsUUID, Min } from 'class-validator';
import { Type } from 'class-transformer';

export class SearchReadyForPickupRequest {
  @ApiPropertyOptional() @IsOptional() @IsUUID() public locationId?: string;
  @ApiPropertyOptional() @IsOptional() @IsString() public name?: string;
  @ApiPropertyOptional() @IsOptional() @Type(() => Number) @IsInt() @Min(1) public $page?: number;
  @ApiPropertyOptional() @IsOptional() @Type(() => Number) @IsInt() @Min(1) public $perPage?: number;
}
