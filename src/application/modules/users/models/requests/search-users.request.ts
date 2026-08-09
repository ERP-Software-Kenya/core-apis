import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsOptional, IsString, Min } from 'class-validator';
import { Type } from 'class-transformer';

export class SearchUsersRequest {
  @ApiProperty() @IsNotEmpty() @IsString() public query: string;
  @ApiPropertyOptional({ default: 20 }) @IsOptional() @Type(() => Number) @IsInt() @Min(1) public limit?: number;
  @ApiPropertyOptional({ default: 0 })  @IsOptional() @Type(() => Number) @IsInt() @Min(0) public offset?: number;
}
