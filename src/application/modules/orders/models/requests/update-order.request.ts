import { AutoMap } from '@automapper/classes';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateOrderRequest {
  @ApiPropertyOptional() @IsOptional() @IsString() @AutoMap() public status?: string;
  @ApiPropertyOptional() @IsOptional() @IsNumber() @AutoMap() public subtotal?: number;
  @ApiPropertyOptional() @IsOptional() @IsNumber() @AutoMap() public taxAmount?: number;
  @ApiPropertyOptional() @IsOptional() @IsNumber() @AutoMap() public totalAmount?: number;
  @ApiPropertyOptional() @IsOptional() @IsString() @AutoMap() public paymentStatus?: string;
}
