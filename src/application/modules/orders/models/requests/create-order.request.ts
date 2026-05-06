import { AutoMap } from '@automapper/classes';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString, IsUUID } from 'class-validator';

export class CreateOrderRequest {
  @ApiProperty() @IsNotEmpty() @IsUUID() @AutoMap() public storeId: string;
  @ApiProperty() @IsNotEmpty() @IsUUID() @AutoMap() public customerId: string;
  @ApiPropertyOptional() @IsOptional() @IsString() @AutoMap() public status?: string;
  @ApiPropertyOptional() @IsOptional() @IsNumber() @AutoMap() public subtotal?: number;
  @ApiPropertyOptional() @IsOptional() @IsNumber() @AutoMap() public taxAmount?: number;
  @ApiPropertyOptional() @IsOptional() @IsNumber() @AutoMap() public totalAmount?: number;
  @ApiPropertyOptional() @IsOptional() @IsString() @AutoMap() public paymentStatus?: string;
}
