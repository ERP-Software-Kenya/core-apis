import { ApiProperty } from '@nestjs/swagger';

export class ClerkUserRolesResponse {
  @ApiProperty() public clerkUserId: string;
  @ApiProperty({ type: [String] }) public roles: string[];
}
