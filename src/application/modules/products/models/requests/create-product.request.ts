import { AutoMap } from '@automapper/classes';
import { ApiPropertyOptional, ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class CreateProductRequest {
  @ApiPropertyOptional() @IsOptional() @IsString() @AutoMap() public name?: string;
}
