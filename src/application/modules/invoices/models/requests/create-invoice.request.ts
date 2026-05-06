import { AutoMap } from '@automapper/classes';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString, IsUUID } from 'class-validator';

export class CreateInvoiceRequest {
  @ApiProperty() @IsNotEmpty() @IsUUID() @AutoMap() public orderId: string;
  @ApiPropertyOptional() @IsOptional() @IsNumber() @AutoMap() public totalAmount?: number;
  @ApiPropertyOptional() @IsOptional() @IsString() @AutoMap() public status?: string;
}
