import { AutoMap } from '@automapper/classes';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { EExpenseStatus } from '../../../../../infrastructure/e-expense-status';

export class ExpenseResponse {
  @ApiProperty() @AutoMap() public id: string;
  @ApiProperty() @AutoMap() public organizationId: string;
  @ApiPropertyOptional() @AutoMap() public locationId?: string;
  @ApiProperty() @AutoMap() public category: string;
  @ApiProperty() @AutoMap() public amount: number;
  @ApiProperty() @AutoMap() public expenseDate: Date;
  @ApiPropertyOptional() @AutoMap() public description?: string;
  @ApiProperty({ enum: EExpenseStatus }) @AutoMap(() => String) public status: EExpenseStatus;
  @ApiPropertyOptional() @AutoMap() public submittedBy?: string;
  @ApiProperty() @AutoMap() public submittedByUserId: string;
  @ApiPropertyOptional() @AutoMap() public submittedByName?: string;
  @ApiPropertyOptional() @AutoMap() public receiptKey?: string;
  @ApiPropertyOptional() @AutoMap() public adminComment?: string;
  @ApiProperty() @AutoMap(() => Date) public createdAt: Date;
}
