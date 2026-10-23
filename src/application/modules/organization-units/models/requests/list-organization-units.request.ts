import { AutoMap } from '@automapper/classes';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsBoolean, IsOptional, IsString } from 'class-validator';

export class ListOrganizationUnitsRequest {
  @ApiPropertyOptional() @IsOptional() @IsString() @AutoMap() public name?: string;
  @ApiPropertyOptional() @IsOptional() @IsString() @AutoMap() public symbol?: string;
  @ApiPropertyOptional() @IsOptional() @IsBoolean() @AutoMap() public isActive?: boolean;
}
