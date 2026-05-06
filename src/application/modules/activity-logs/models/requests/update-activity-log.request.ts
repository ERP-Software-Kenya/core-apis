import { AutoMap } from '@automapper/classes';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsObject, IsOptional } from 'class-validator';

export class UpdateActivityLogRequest {
  @ApiPropertyOptional() @IsOptional() @IsObject() @AutoMap() public details?: Record<string, any>;
}
