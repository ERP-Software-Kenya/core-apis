import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { EOrganizationInvitationStatus } from '../../../../../infrastructure';

export class PublicOrganizationInvitationResponse {
  @ApiProperty() public organizationName: string;
  @ApiProperty() public invitedEmailMasked: string;
  @ApiProperty() public roleName: string;
  @ApiProperty({ enum: EOrganizationInvitationStatus }) public status: EOrganizationInvitationStatus;
  @ApiProperty() public expiresAt: Date;
  @ApiProperty() public appLink: string;
  @ApiPropertyOptional() public androidInstallUrl?: string;
  @ApiPropertyOptional() public iosInstallUrl?: string;
  @ApiPropertyOptional() public desktopInstallUrl?: string;
}
