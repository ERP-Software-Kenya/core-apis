import { AutoMap } from '@automapper/classes';
import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNotEmpty, IsString } from 'class-validator';

export class UpdateUserRolesRequest {
  @ApiProperty({ type: [String] }) @IsNotEmpty() @IsArray() @IsString({ each: true }) @AutoMap(() => [String]) public roles: string[];
}
