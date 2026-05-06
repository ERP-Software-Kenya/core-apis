import { AutoMap } from '@automapper/classes';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class PlatformConfigurationResponse {
  @ApiProperty() @AutoMap() public id: string;
  @ApiProperty() @AutoMap() public configKey: string;
  @ApiProperty() @AutoMap() public configValue: Record<string, any>;
  @ApiPropertyOptional() @AutoMap() public description?: string;
}
