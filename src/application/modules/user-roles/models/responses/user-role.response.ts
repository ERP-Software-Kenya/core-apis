import { AutoMap } from '@automapper/classes';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class UserRoleResponse {
  @ApiProperty() @AutoMap() public id: string;
  @ApiProperty() @AutoMap() public userId: string;
  @ApiProperty() @AutoMap() public roleId: string;
  @ApiPropertyOptional() @AutoMap() public locationId?: string;
}
