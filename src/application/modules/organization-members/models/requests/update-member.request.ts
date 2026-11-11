import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsIn, IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';
import { AutoMap } from '@automapper/classes';

export class UpdateMemberRequest {
  @ApiPropertyOptional() @IsOptional() @IsUUID() @AutoMap() public roleId?: string;
  @ApiPropertyOptional({ nullable: true, description: 'Set null to grant organization-wide access.' })
  @IsOptional() @IsUUID() @AutoMap() public locationId?: string | null;
  @ApiPropertyOptional({ enum: ['active', 'suspended'] })
  @IsOptional() @IsNotEmpty() @IsString() @IsIn(['active', 'suspended']) @AutoMap()
  public status?: 'active' | 'suspended';
}
