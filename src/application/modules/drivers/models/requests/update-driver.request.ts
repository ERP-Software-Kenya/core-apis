import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsOptional, IsEmail } from 'class-validator';
import { AutoMap } from '@automapper/classes';

export class UpdateDriverRequest {
  @ApiPropertyOptional() @AutoMap() @IsOptional() @IsString() public firstName?: string;
  @ApiPropertyOptional() @AutoMap() @IsOptional() @IsString() public lastName?: string;
  @ApiPropertyOptional() @AutoMap() @IsOptional() @IsString() public phone?: string;
  @ApiPropertyOptional() @AutoMap() @IsOptional() @IsEmail() public email?: string;
  @ApiPropertyOptional() @AutoMap() @IsOptional() @IsString() public licenseNumber?: string;
  @ApiPropertyOptional() @AutoMap() @IsOptional() @IsString() public licenseType?: string;
  @ApiPropertyOptional() @AutoMap() @IsOptional() @IsString() public employeeId?: string;
  @ApiPropertyOptional() @AutoMap() @IsOptional() @IsString() public address?: string;
  @ApiPropertyOptional() @AutoMap() @IsOptional() @IsString() public emergencyContact?: string;
}
