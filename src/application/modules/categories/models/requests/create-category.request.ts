import { AutoMap } from '@automapper/classes';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';

export class CreateCategoryRequest {
  @ApiProperty() @IsNotEmpty() @IsString() @AutoMap() public name: string;
  @ApiPropertyOptional() @IsOptional() @IsString() @AutoMap() public description?: string;
  @ApiPropertyOptional() @IsOptional() @IsUUID() @AutoMap() public parentId?: string;
}
