import { AutoMap } from '@automapper/classes';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateSupplierRequest {
  @ApiProperty() @IsNotEmpty() @IsString() @AutoMap() public name: string;
  @ApiPropertyOptional() @IsOptional() @IsString() @AutoMap() public contactPerson?: string;
  @ApiPropertyOptional() @IsOptional() @IsEmail() @AutoMap() public email?: string;
  @ApiPropertyOptional() @IsOptional() @IsString() @AutoMap() public phone?: string;
  @ApiPropertyOptional() @IsOptional() @IsString() @AutoMap() public address?: string;
  @ApiPropertyOptional() @IsOptional() @IsString() @AutoMap() public taxId?: string;
}
