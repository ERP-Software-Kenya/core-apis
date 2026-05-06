import { AutoMap } from '@automapper/classes';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsDateString, IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateExpenseRequest {
  @ApiPropertyOptional() @IsOptional() @IsString() @AutoMap() public category?: string;
  @ApiPropertyOptional() @IsOptional() @IsNumber() @AutoMap() public amount?: number;
  @ApiPropertyOptional() @IsOptional() @IsDateString() @AutoMap() public expenseDate?: Date;
  @ApiPropertyOptional() @IsOptional() @IsString() @AutoMap() public description?: string;
}
