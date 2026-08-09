import { AutoMap } from '@automapper/classes';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { ECommissionStatus } from '../../../../../infrastructure/persistence/entities/commission-payable.entity';

export class CommissionPayableResponse {
  @ApiProperty() @AutoMap() public id: string;
  @ApiProperty() @AutoMap() public organizationId: string;
  @ApiProperty() @AutoMap() public billId: string;
  @ApiPropertyOptional() @AutoMap() public facilitatorUserId?: string;
  @ApiPropertyOptional() @AutoMap() public facilitatorName?: string;
  @ApiProperty() @AutoMap() public amount: number;
  @ApiProperty({ enum: ECommissionStatus }) @AutoMap(() => String) public status: ECommissionStatus;
  @ApiPropertyOptional() @AutoMap(() => Date) public paidAt?: Date;
  @ApiProperty() @AutoMap(() => Date) public createdAt: Date;
}
