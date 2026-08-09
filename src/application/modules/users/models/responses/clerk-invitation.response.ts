import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { EInvitationStatus } from '../../../../../infrastructure/e-invitation-status';

export class ClerkInvitationResponse {
  @ApiProperty() public id: string;
  @ApiProperty() public emailAddress: string;
  @ApiProperty({ enum: EInvitationStatus }) public status: EInvitationStatus;
  @ApiPropertyOptional({ type: [String] }) public roles?: string[];
  @ApiProperty() public createdAt: number;
  @ApiProperty() public updatedAt: number;
}
