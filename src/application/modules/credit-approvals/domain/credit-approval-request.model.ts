import { AutoMap } from '@automapper/classes';
import { ECreditApprovalStatus } from '../../../../infrastructure/persistence/entities/credit-approval-request.entity';
import { Bill } from '../../bills/domain';

export class CreditApprovalRequest {
  @AutoMap() public id: string;
  @AutoMap() public organizationId: string;
  @AutoMap() public customerId: string;
  @AutoMap() public billId: string;
  @AutoMap() public requestedAmount: number;
  @AutoMap() public requestedById: string;
  @AutoMap(() => String) public status: ECreditApprovalStatus;
  @AutoMap() public decidedById?: string;
  @AutoMap(() => Date) public decidedAt?: Date;
  @AutoMap(() => Date) public createdAt: Date;
  @AutoMap(() => Bill) public bill?: Bill;
}
