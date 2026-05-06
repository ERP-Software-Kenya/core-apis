import { AutoMap } from '@automapper/classes';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsUUID } from 'class-validator';

export class UpdateUserRoleRequest {
  @ApiPropertyOptional() @IsOptional() @IsUUID() @AutoMap() public roleId?: string;
}
