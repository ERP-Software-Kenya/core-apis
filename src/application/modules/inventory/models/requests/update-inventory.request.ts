import { AutoMap } from '@automapper/classes';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString, Min } from 'class-validator';

export class UpdateInventoryRequest {
  @ApiPropertyOptional() @IsOptional() @IsNumber() @Min(0) @AutoMap() public reorderLevel?: number;
  @ApiPropertyOptional() @IsOptional() @IsNumber() @Min(0) @AutoMap() public maxStock?: number;
  @ApiPropertyOptional() @IsOptional() @IsString() @AutoMap() public binLocation?: string;
}
