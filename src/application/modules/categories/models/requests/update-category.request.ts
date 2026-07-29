import { AutoMap } from '@automapper/classes';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsBoolean, IsOptional, IsString, IsUUID } from 'class-validator';

export class UpdateCategoryRequest {
  @ApiPropertyOptional() @IsOptional() @IsString() @AutoMap() public name?: string;
  @ApiPropertyOptional() @IsOptional() @IsString() @AutoMap() public description?: string;
  @ApiPropertyOptional() @IsOptional() @IsUUID() @AutoMap() public parentId?: string;
  @ApiPropertyOptional() @IsOptional() @IsBoolean() @AutoMap() public isActive?: boolean;
}
