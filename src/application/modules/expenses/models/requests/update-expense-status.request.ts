import { AutoMap } from '@automapper/classes';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { EExpenseStatus } from '../../../../../infrastructure/e-expense-status';

export class UpdateExpenseStatusRequest {
  @ApiProperty({ enum: EExpenseStatus })
  @IsNotEmpty()
  @IsEnum(EExpenseStatus)
  @AutoMap(() => String)
  public status: EExpenseStatus;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @AutoMap()
  public comment?: string;
}
