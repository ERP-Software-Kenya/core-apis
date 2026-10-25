import { AutoMap } from '@automapper/classes';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsBoolean, IsNumber, IsOptional, IsString, Max, MaxLength, Min } from 'class-validator';

export class UpdateTaxRequest {
  @ApiPropertyOptional() @IsOptional() @IsString() @MaxLength(100) @AutoMap() public name?: string;
  @ApiPropertyOptional() @IsOptional() @IsNumber() @Min(0) @Max(100) @AutoMap() public rate?: number;
  @ApiPropertyOptional() @IsOptional() @IsString() @AutoMap() public description?: string;
  @ApiPropertyOptional() @IsOptional() @IsBoolean() @AutoMap() public isActive?: boolean;
}
