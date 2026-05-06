import { AutoMap } from '@automapper/classes';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsBoolean, IsEmail, IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';

export class CreateUserRequest {
  @ApiProperty() @IsNotEmpty() @IsEmail() @AutoMap() public email: string;
  @ApiProperty() @IsNotEmpty() @IsString() @AutoMap() public passwordHash: string;
  @ApiProperty() @IsNotEmpty() @IsString() @AutoMap() public firstName: string;
  @ApiProperty() @IsNotEmpty() @IsString() @AutoMap() public lastName: string;
  @ApiPropertyOptional() @IsOptional() @IsString() @AutoMap() public phone?: string;
  @ApiProperty() @IsNotEmpty() @IsUUID() @AutoMap() public organizationId: string;
  @ApiPropertyOptional() @IsOptional() @IsUUID() @AutoMap() public storeId?: string;
  @ApiPropertyOptional() @IsOptional() @IsBoolean() @AutoMap() public isActive?: boolean;
}
