import { AutoMap } from '@automapper/classes';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsObject, IsOptional, IsString } from 'class-validator';

export class UpdatePlatformConfigurationRequest {
  @ApiPropertyOptional() @IsOptional() @IsObject() @AutoMap() public configValue?: Record<string, any>;
  @ApiPropertyOptional() @IsOptional() @IsString() @AutoMap() public description?: string;
}
