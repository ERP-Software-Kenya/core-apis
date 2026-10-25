import { AutoMap } from '@automapper/classes';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class OrganizationUnitResponse {
  @ApiProperty() @AutoMap() public id: string;
  @ApiPropertyOptional() @AutoMap() public organizationId?: string;
  @ApiPropertyOptional() @AutoMap() public name?: string;
  @ApiPropertyOptional() @AutoMap() public symbol?: string;
  @ApiPropertyOptional() @AutoMap() public isActive?: boolean;
  @ApiPropertyOptional() @AutoMap() public sortOrder?: number;
  @ApiPropertyOptional() @AutoMap(() => Date) public createdAt?: Date;
  @ApiPropertyOptional() @AutoMap(() => Date) public updatedAt?: Date;
}
