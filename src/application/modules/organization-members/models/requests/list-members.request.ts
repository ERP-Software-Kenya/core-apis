import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsIn, IsInt, IsOptional, IsString, IsUUID, MaxLength, Min } from 'class-validator';

export const ORGANIZATION_MEMBER_STATUSES = ['active', 'suspended', 'removed'] as const;
export const ORGANIZATION_MEMBERS_MAX_LIMIT = 100;

export class ListMembersRequest {
  @ApiPropertyOptional() @IsOptional() @IsUUID() public organizationId?: string;
  @ApiPropertyOptional({ description: 'When set (with or without limit) the response is a paged object instead of a flat array' })
  @IsOptional() @Type(() => Number) @IsInt() @Min(1) public page?: number;
  @ApiPropertyOptional({ default: 15, maximum: ORGANIZATION_MEMBERS_MAX_LIMIT })
  @IsOptional() @Type(() => Number) @IsInt() @Min(1) public limit?: number;
  @ApiPropertyOptional({ description: 'Matches email, first name or last name' })
  @IsOptional() @IsString() @MaxLength(100) public search?: string;
  @ApiPropertyOptional({ enum: ORGANIZATION_MEMBER_STATUSES })
  @IsOptional() @IsIn(ORGANIZATION_MEMBER_STATUSES) public status?: string;
}
