import { AutoMap } from '@automapper/classes';
import { ECommissionStatus } from '../../../../infrastructure/persistence/entities/commission-payable.entity';

export class CommissionPayable {
  @AutoMap() public id: string;
  @AutoMap() public organizationId: string;
  @AutoMap() public billId: string;
  @AutoMap() public facilitatorUserId?: string;
  @AutoMap() public facilitatorName?: string;
  @AutoMap() public amount: number;
  @AutoMap(() => String) public status: ECommissionStatus;
  @AutoMap(() => Date) public paidAt?: Date;
  @AutoMap(() => Date) public createdAt: Date;
}
