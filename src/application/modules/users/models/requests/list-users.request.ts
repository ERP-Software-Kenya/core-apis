import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsInt, IsOptional, IsString, Min } from 'class-validator';
import { Type } from 'class-transformer';

export class ListUsersRequest {
  @ApiPropertyOptional({ default: 20 }) @IsOptional() @Type(() => Number) @IsInt() @Min(1) public limit?: number;
  @ApiPropertyOptional({ default: 0 })  @IsOptional() @Type(() => Number) @IsInt() @Min(0) public offset?: number;
  @ApiPropertyOptional() @IsOptional() @IsString() public organizationId?: string;
}
