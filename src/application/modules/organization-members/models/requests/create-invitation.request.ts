import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEmail, IsOptional, IsString, IsUUID } from 'class-validator';
import { AutoMap } from '@automapper/classes';

export class CreateInvitationRequest {
  @ApiProperty() @IsEmail() @AutoMap() public email: string;
  @ApiProperty() @IsUUID() @AutoMap() public roleId: string;
  @ApiPropertyOptional() @IsOptional() @IsUUID() @AutoMap() public locationId?: string;
  @ApiPropertyOptional() @IsOptional() @IsString() @AutoMap() public firstName?: string;
  @ApiPropertyOptional() @IsOptional() @IsString() @AutoMap() public lastName?: string;
  @ApiPropertyOptional({ description: 'SuperAdmin only; ignored for organization admins.' })
  @IsOptional() @IsUUID() @AutoMap() public organizationId?: string;
}
