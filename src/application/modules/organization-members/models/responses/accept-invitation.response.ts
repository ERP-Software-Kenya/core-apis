import { ApiProperty } from '@nestjs/swagger';

export class AcceptInvitationOrganization {
  @ApiProperty() public id: string;
  @ApiProperty() public name: string;
}

export class AcceptInvitationMembership {
  @ApiProperty() public id: string;
  @ApiProperty() public status: string;
  @ApiProperty() public role: string;
  @ApiProperty({ type: [String] }) public locationIds: string[];
}

export class AcceptInvitationResponse {
  @ApiProperty({ type: AcceptInvitationOrganization }) public organization: AcceptInvitationOrganization;
  @ApiProperty({ type: AcceptInvitationMembership }) public membership: AcceptInvitationMembership;
}
