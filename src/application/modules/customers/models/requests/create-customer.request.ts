import { AutoMap } from '@automapper/classes';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { ECustomerType } from '../../../../../infrastructure/persistence/entities';

export class CreateCustomerRequest {
  @ApiProperty() @IsNotEmpty() @IsString() @AutoMap() public name: string;
  @ApiPropertyOptional() @IsOptional() @IsString() @AutoMap() public email?: string;
  @ApiPropertyOptional() @IsOptional() @IsString() @AutoMap() public phone?: string;
  @ApiPropertyOptional() @IsOptional() @IsString() @AutoMap() public gstin?: string;
  @ApiPropertyOptional() @IsOptional() @IsNumber() @AutoMap() public creditLimit?: number;
  @ApiPropertyOptional({ enum: ECustomerType }) @IsOptional() @IsEnum(ECustomerType) @AutoMap(() => String) public customerType?: ECustomerType;
}
