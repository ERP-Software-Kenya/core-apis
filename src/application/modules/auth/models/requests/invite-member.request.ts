import { AutoMap } from '@automapper/classes';
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsUUID } from 'class-validator';

export class InviteMemberRequest {
  @ApiProperty({ example: 'member@acme.com', description: 'Email of the user to invite (must already have a Clerk account)' })
  @IsEmail()
  @AutoMap()
  public email: string;

  @ApiProperty({ description: 'Role UUID to assign to the invited member' })
  @IsUUID()
  @AutoMap()
  public roleId: string;
}
