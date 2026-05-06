import { AutoMap } from '@automapper/classes';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsObject, IsOptional, IsString } from 'class-validator';

export class CreatePlatformConfigurationRequest {
  @ApiProperty() @IsNotEmpty() @IsString() @AutoMap() public configKey: string;
  @ApiProperty() @IsNotEmpty() @IsObject() @AutoMap() public configValue: Record<string, any>;
  @ApiPropertyOptional() @IsOptional() @IsString() @AutoMap() public description?: string;
}
