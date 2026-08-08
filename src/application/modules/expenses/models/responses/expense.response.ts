import { AutoMap } from '@automapper/classes';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class ExpenseResponse {
  @ApiProperty() @AutoMap() public id: string;
  @ApiProperty() @AutoMap() public organizationId: string;
  @ApiPropertyOptional() @AutoMap() public locationId?: string;
  @ApiProperty() @AutoMap() public category: string;
  @ApiProperty() @AutoMap() public amount: number;
  @ApiProperty() @AutoMap() public expenseDate: Date;
  @ApiPropertyOptional() @AutoMap() public description?: string;
}
