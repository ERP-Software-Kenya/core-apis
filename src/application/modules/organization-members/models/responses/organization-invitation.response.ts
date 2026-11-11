import { AutoMap } from '@automapper/classes';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { EOrganizationInvitationStatus } from '../../../../../infrastructure';

export class OrganizationInvitationResponse {
  @ApiProperty() @AutoMap() public id: string;
  @ApiProperty() @AutoMap() public email: string;
  @ApiPropertyOptional() @AutoMap() public firstName?: string;
  @ApiPropertyOptional() @AutoMap() public lastName?: string;
  @ApiProperty() @AutoMap() public organizationId: string;
  @ApiProperty() @AutoMap() public organizationName: string;
  @ApiProperty() @AutoMap() public roleId: string;
  @ApiProperty() @AutoMap() public roleName: string;
  @ApiPropertyOptional() @AutoMap() public locationId?: string;
  @ApiPropertyOptional() @AutoMap() public locationName?: string;
  @ApiProperty({ enum: EOrganizationInvitationStatus }) @AutoMap(() => String) public status: EOrganizationInvitationStatus;
  @ApiProperty() @AutoMap(() => Date) public expiresAt: Date;
  @ApiProperty() @AutoMap(() => Date) public lastSentAt: Date;
  @ApiProperty() @AutoMap() public sendCount: number;
  @ApiProperty() @AutoMap(() => Date) public createdAt: Date;
}
