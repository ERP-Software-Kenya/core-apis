import { AutoMap } from '@automapper/classes';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { ECreditApprovalStatus } from '../../../../../infrastructure/persistence/entities/credit-approval-request.entity';
import { BillResponse } from '../../../bills/models';

export class CreditApprovalRequestResponse {
  @ApiProperty() @AutoMap() public id: string;
  @ApiProperty() @AutoMap() public organizationId: string;
  @ApiProperty() @AutoMap() public customerId: string;
  @ApiProperty() @AutoMap() public billId: string;
  @ApiProperty() @AutoMap() public requestedAmount: number;
  @ApiProperty() @AutoMap() public requestedById: string;
  @ApiProperty({ enum: ECreditApprovalStatus }) @AutoMap(() => String) public status: ECreditApprovalStatus;
  @ApiPropertyOptional() @AutoMap() public decidedById?: string;
  @ApiPropertyOptional() @AutoMap(() => Date) public decidedAt?: Date;
  @ApiProperty() @AutoMap(() => Date) public createdAt: Date;
  @ApiPropertyOptional({ type: () => BillResponse }) @AutoMap(() => BillResponse) public bill?: BillResponse;
}
