import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { AutoMap } from '@automapper/classes';

export class VehicleExpenseResponse {
  @ApiProperty() @AutoMap() public id: string;
  @ApiProperty() @AutoMap() public vehicleId: string;
  @ApiProperty() @AutoMap() public organizationId: string;
  @ApiProperty() @AutoMap() public expenseType: string;
  @ApiProperty() @AutoMap() public amount: number;
  @ApiProperty() @AutoMap() public expenseDate: Date;
  @ApiPropertyOptional() @AutoMap() public description?: string;
  @ApiPropertyOptional() @AutoMap() public tripId?: string;
}
