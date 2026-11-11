import { ApiProperty } from '@nestjs/swagger';
import { OrganizationMemberResponse } from './organization-member.response';

export class PaginatedOrganizationMembersResponse {
  @ApiProperty({ type: [OrganizationMemberResponse] }) public items: OrganizationMemberResponse[];
  @ApiProperty() public total: number;
  @ApiProperty() public page: number;
  @ApiProperty() public limit: number;
  @ApiProperty() public totalPages: number;
}
