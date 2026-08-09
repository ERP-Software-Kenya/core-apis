import { AutoMap } from '@automapper/classes';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsOptional } from 'class-validator';
import { EBillStatus, EPaymentMethod } from '../../../../../infrastructure/persistence/entities/bill.entity';

export class TransitionBillStatusRequest {
  @ApiProperty({ enum: [EBillStatus.DRAFT, EBillStatus.COMPLETED, EBillStatus.CANCELLED] })
  @IsEnum(EBillStatus)
  @AutoMap()
  public status: EBillStatus;

  @ApiPropertyOptional({ enum: EPaymentMethod })
  @IsOptional()
  @IsEnum(EPaymentMethod)
  @AutoMap()
  public paymentMethod?: EPaymentMethod;
}
