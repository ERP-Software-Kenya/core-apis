import { AutoMap } from '@automapper/classes';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateInvoiceRequest {
  @ApiPropertyOptional() @IsOptional() @IsNumber() @AutoMap() public totalAmount?: number;
  @ApiPropertyOptional() @IsOptional() @IsString() @AutoMap() public status?: string;
}
