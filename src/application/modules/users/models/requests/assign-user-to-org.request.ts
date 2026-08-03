import { AutoMap } from '@automapper/classes';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class AssignUserToOrgRequest {
  @ApiProperty() @IsNotEmpty() @IsString() @AutoMap() public organizationId: string;
  @ApiProperty({ description: 'Clerk org role slug, e.g. "org:admin" or "org:member"' })
  @IsNotEmpty() @IsString() @AutoMap() public role: string;
}
