import { AutoMap } from '@automapper/classes';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsDateString, IsNumber, IsOptional, IsString, Min } from 'class-validator';

export class RecordUnpublishedStockPOPaymentRequest {
  @ApiProperty({ minimum: 0.0001 }) @AutoMap() @IsNumber() @Min(0.0001) public amount: number;
  @ApiProperty() @AutoMap() @IsString() public paymentMethod: string;
  @ApiPropertyOptional() @AutoMap(() => Date) @IsOptional() @IsDateString() public paidAt?: Date;
  @ApiPropertyOptional() @AutoMap() @IsOptional() @IsString() public note?: string;
}
