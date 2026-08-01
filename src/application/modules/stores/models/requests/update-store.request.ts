import { AutoMap } from '@automapper/classes';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsBoolean, IsOptional, IsString } from 'class-validator';

export class UpdateStoreRequest {
  @ApiPropertyOptional() @IsOptional() @IsString()  @AutoMap() public name?: string;
  @ApiPropertyOptional() @IsOptional() @IsString()  @AutoMap() public code?: string;
  @ApiPropertyOptional() @IsOptional() @IsString()  @AutoMap() public address?: string;
  @ApiPropertyOptional() @IsOptional() @IsString()  @AutoMap() public city?: string;
  @ApiPropertyOptional() @IsOptional() @IsString()  @AutoMap() public state?: string;
  @ApiPropertyOptional() @IsOptional() @IsString()  @AutoMap() public country?: string;
  @ApiPropertyOptional() @IsOptional() @IsString()  @AutoMap() public phone?: string;
  @ApiPropertyOptional() @IsOptional() @IsString()  @AutoMap() public email?: string;
  @ApiPropertyOptional() @IsOptional() @IsBoolean() @AutoMap() public isActive?: boolean;
}
