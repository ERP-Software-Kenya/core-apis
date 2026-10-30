import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class OrganizationMemberResponse {
  @ApiProperty() public id: string;
  @ApiProperty() public userId: string;
  @ApiProperty() public email: string;
  @ApiPropertyOptional() public firstName?: string;
  @ApiPropertyOptional() public lastName?: string;
  @ApiProperty() public roleId: string;
  @ApiProperty() public roleName: string;
  @ApiPropertyOptional() public locationId?: string;
  @ApiPropertyOptional() public locationName?: string;
  @ApiProperty() public status: string;
  @ApiPropertyOptional() public joinedAt?: Date;
}
