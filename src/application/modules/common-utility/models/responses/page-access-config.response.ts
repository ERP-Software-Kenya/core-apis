import { ApiProperty } from '@nestjs/swagger';

export class PageAccessConfigResponse {
  @ApiProperty({ example: 'users' })
  public pageKey: string;

  @ApiProperty({ type: [String], example: ['super_admin', 'org_admin'] })
  public allowedRoles: string[];
}
