import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString, IsUUID } from 'class-validator';

export class SearchReadyForPickupRequest {
  @ApiPropertyOptional() @IsOptional() @IsUUID() public locationId?: string;
  @ApiPropertyOptional() @IsOptional() @IsString() public name?: string;
  @ApiPropertyOptional() @IsOptional() @IsNumber() public $page?: number;
  @ApiPropertyOptional() @IsOptional() @IsNumber() public $perPage?: number;
}
