import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsNumber, IsOptional, IsString, IsUUID, IsDateString } from 'class-validator';
import { AutoMap } from '@automapper/classes';
import { EExpenseType } from 'src/application/shared/enums/e-expense-type';

export class CreateVehicleExpenseRequest {
  @ApiProperty() @AutoMap() @IsUUID() public vehicleId: string;
  @ApiProperty({ enum: EExpenseType }) @AutoMap(() => String) @IsEnum(EExpenseType) public expenseType: EExpenseType;
  @ApiProperty() @AutoMap() @IsNumber() public amount: number;
  @ApiProperty() @AutoMap() @IsDateString() public expenseDate: Date;
  @ApiPropertyOptional() @AutoMap() @IsOptional() @IsString() public description?: string;
  @ApiPropertyOptional() @AutoMap() @IsOptional() @IsUUID() public tripId?: string;
}
