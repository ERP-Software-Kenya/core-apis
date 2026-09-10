import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString, Min } from 'class-validator';
import { EPaymentMethod } from '../../../../../infrastructure/persistence/entities';

export class RecordOrderPaymentRequest {
  @ApiProperty() @IsNotEmpty() @IsNumber() @Min(0.01) public amount: number;
  @ApiProperty({ enum: EPaymentMethod }) @IsNotEmpty() @IsEnum(EPaymentMethod) public method: EPaymentMethod;
  @ApiPropertyOptional() @IsOptional() @IsString() public reference?: string;
}
