import { AutoMap } from '@automapper/classes';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsArray, IsEmail, IsNotEmpty, IsOptional, IsString, IsUrl } from 'class-validator';

export class InviteUserRequest {
  @ApiProperty() @IsNotEmpty() @IsEmail() @AutoMap() public email: string;
  @ApiPropertyOptional({ type: [String] }) @IsOptional() @IsArray() @IsString({ each: true }) @AutoMap(() => [String]) public roles?: string[];
  @ApiPropertyOptional() @IsOptional() @IsUrl() @AutoMap() public redirectUrl?: string;
}
