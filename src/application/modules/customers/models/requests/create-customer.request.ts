import { AutoMap } from '@automapper/classes';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateCustomerRequest {
  @ApiProperty() @IsNotEmpty() @IsString() @AutoMap() public name: string;
  @ApiPropertyOptional() @IsOptional() @IsString() @AutoMap() public email?: string;
  @ApiPropertyOptional() @IsOptional() @IsString() @AutoMap() public phone?: string;
  @ApiPropertyOptional() @IsOptional() @IsString() @AutoMap() public gstin?: string;
}
