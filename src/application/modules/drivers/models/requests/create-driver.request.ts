import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsOptional, IsEmail, IsUUID } from 'class-validator';
import { AutoMap } from '@automapper/classes';

export class CreateDriverRequest {
  @ApiPropertyOptional() @AutoMap() @IsOptional() @IsUUID() public userId?: string;
  @ApiProperty() @AutoMap() @IsString() public firstName: string;
  @ApiProperty() @AutoMap() @IsString() public lastName: string;
  @ApiProperty() @AutoMap() @IsString() public phone: string;
  @ApiPropertyOptional() @AutoMap() @IsOptional() @IsEmail() public email?: string;
  @ApiProperty() @AutoMap() @IsString() public licenseNumber: string;
  @ApiPropertyOptional() @AutoMap() @IsOptional() @IsString() public licenseType?: string;
  @ApiPropertyOptional() @AutoMap() @IsOptional() @IsString() public employeeId?: string;
}
