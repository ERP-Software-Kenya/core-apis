import { AutoMap } from '@automapper/classes';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsDateString, IsNumber, IsOptional, IsString, Min } from 'class-validator';

export class RecordPurchaseOrderPaymentRequest {
  @ApiProperty({ description: 'Payment amount', minimum: 0.0001 })
  @AutoMap()
  @IsNumber()
  @Min(0.0001)
  public amount: number;

  @ApiProperty({ description: 'Payment method e.g. cash, bank_transfer, cheque' })
  @AutoMap()
  @IsString()
  public paymentMethod: string;

  @ApiPropertyOptional({ description: 'Actual date payment was made' })
  @AutoMap(() => Date)
  @IsOptional()
  @IsDateString()
  public paidAt?: Date;

  @ApiPropertyOptional({ description: 'Optional note about the payment' })
  @AutoMap()
  @IsOptional()
  @IsString()
  public note?: string;
}
