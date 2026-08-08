import { ApiProperty } from '@nestjs/swagger';
import { ClerkUserResponse } from './clerk-user.response';

export class ClerkUserListResponse {
  @ApiProperty({ type: [ClerkUserResponse] }) public data: ClerkUserResponse[];
  @ApiProperty() public totalCount: number;
}
