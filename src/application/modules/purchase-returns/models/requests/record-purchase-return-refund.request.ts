import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsDate, IsIn, IsNumber, IsOptional, IsString, Min } from 'class-validator';
export class RecordPurchaseReturnRefundRequest {
  @ApiProperty() @IsNumber() @Min(0.0001) amount: number;
  @ApiProperty({ enum: ['CASH', 'CARD', 'UPI', 'NET_BANKING', 'CHEQUE'] }) @IsString() @IsIn(['CASH', 'CARD', 'UPI', 'NET_BANKING', 'CHEQUE']) paymentMethod: string;
  @ApiPropertyOptional() @IsOptional() @Type(() => Date) @IsDate() receivedAt?: Date;
  @ApiPropertyOptional() @IsOptional() @IsString() note?: string;
}
