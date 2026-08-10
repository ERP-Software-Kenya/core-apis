import { ApiProperty } from '@nestjs/swagger';

export class ClerkOrganizationResponse {
  @ApiProperty() public organizationId: string;
  @ApiProperty() public name: string;
  @ApiProperty() public slug: string;
}
