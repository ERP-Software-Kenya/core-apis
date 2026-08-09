import { AutoMap } from '@automapper/classes';
import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty } from 'class-validator';
import { EExpenseStatus } from '../../../../../infrastructure/e-expense-status';

export class UpdateExpenseStatusRequest {
  @ApiProperty({ enum: EExpenseStatus })
  @IsNotEmpty()
  @IsEnum(EExpenseStatus)
  @AutoMap(() => String)
  public status: EExpenseStatus;
}
