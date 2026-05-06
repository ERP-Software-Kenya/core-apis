import { AutoMap } from '@automapper/classes';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsBoolean, IsOptional, IsString, IsUUID } from 'class-validator';

export class UpdateUserRequest {
  @ApiPropertyOptional() @IsOptional() @IsString() @AutoMap() public firstName?: string;
  @ApiPropertyOptional() @IsOptional() @IsString() @AutoMap() public lastName?: string;
  @ApiPropertyOptional() @IsOptional() @IsString() @AutoMap() public phone?: string;
  @ApiPropertyOptional() @IsOptional() @IsUUID() @AutoMap() public storeId?: string;
  @ApiPropertyOptional() @IsOptional() @IsBoolean() @AutoMap() public isActive?: boolean;
}
