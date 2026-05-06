import { AutoMap } from '@automapper/classes';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsDateString, IsNotEmpty, IsNumber, IsOptional, IsString, IsUUID } from 'class-validator';

export class CreateExpenseRequest {
  @ApiProperty() @IsNotEmpty() @IsUUID() @AutoMap() public organizationId: string;
  @ApiPropertyOptional() @IsOptional() @IsUUID() @AutoMap() public storeId?: string;
  @ApiProperty() @IsNotEmpty() @IsString() @AutoMap() public category: string;
  @ApiProperty() @IsNotEmpty() @IsNumber() @AutoMap() public amount: number;
  @ApiProperty() @IsNotEmpty() @IsDateString() @AutoMap() public expenseDate: Date;
  @ApiPropertyOptional() @IsOptional() @IsString() @AutoMap() public description?: string;
}
