import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';
import { EOrganizationInvitationStatus } from '../../../infrastructure';

export class CreateOrganizationInvitationRequest {
  @ApiProperty() @IsEmail() public email: string;
  @ApiProperty() @IsUUID() public roleId: string;
  @ApiPropertyOptional() @IsOptional() @IsUUID() public locationId?: string;
  @ApiPropertyOptional() @IsOptional() @IsString() public firstName?: string;
  @ApiPropertyOptional() @IsOptional() @IsString() public lastName?: string;
  @ApiPropertyOptional({ description: 'SuperAdmin only; ignored for organization admins.' })
  @IsOptional() @IsUUID() public organizationId?: string;
}

export class UpdateOrganizationMemberRequest {
  @ApiPropertyOptional() @IsOptional() @IsUUID() public roleId?: string;
  @ApiPropertyOptional({ nullable: true, description: 'Set null to grant organization-wide access.' })
  @IsOptional() @IsUUID() public locationId?: string | null;
  @ApiPropertyOptional({ enum: ['active', 'suspended'] }) @IsOptional() @IsNotEmpty() @IsString()
  public status?: 'active' | 'suspended';
}

export interface OrganizationInvitationResponse {
  id: string; email: string; firstName?: string; lastName?: string;
  organizationId: string; organizationName: string; roleId: string; roleName: string;
  locationId?: string; locationName?: string; status: EOrganizationInvitationStatus;
  expiresAt: Date; lastSentAt: Date; sendCount: number; createdAt: Date;
}

export interface PublicOrganizationInvitationResponse {
  organizationName: string; invitedEmailMasked: string; roleName: string;
  status: EOrganizationInvitationStatus; expiresAt: Date; appLink: string;
  androidInstallUrl?: string; iosInstallUrl?: string; desktopInstallUrl?: string;
}

export interface OrganizationMemberResponse {
  id: string; userId: string; email: string; firstName?: string; lastName?: string;
  roleId: string; roleName: string; locationId?: string; locationName?: string;
  status: string; joinedAt?: Date;
}
