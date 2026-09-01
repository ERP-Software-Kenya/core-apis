import { AutoMap } from '@automapper/classes';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsArray, IsBoolean, IsOptional, IsString, IsUUID, MaxLength } from 'class-validator';

export class UpdateBranchRequest {
  @ApiPropertyOptional() @IsOptional() @IsString() @MaxLength(150) @AutoMap() public name?: string;
  @ApiPropertyOptional() @IsOptional() @IsString() @MaxLength(50) @AutoMap() public code?: string;
  @ApiPropertyOptional() @IsOptional() @IsString() @MaxLength(300) @AutoMap() public address?: string;
  @ApiPropertyOptional() @IsOptional() @IsString() @MaxLength(100) @AutoMap() public city?: string;
  @ApiPropertyOptional() @IsOptional() @IsString() @MaxLength(100) @AutoMap() public state?: string;
  @ApiPropertyOptional() @IsOptional() @IsString() @MaxLength(100) @AutoMap() public country?: string;
  @ApiPropertyOptional() @IsOptional() @IsString() @MaxLength(50) @AutoMap() public phone?: string;
  @ApiPropertyOptional() @IsOptional() @IsBoolean() @AutoMap() public isActive?: boolean;
  @ApiPropertyOptional({ type: [String] })
  @IsOptional() @IsArray() @IsUUID('4', { each: true }) @AutoMap(() => [String]) public locationIds?: string[];
}
