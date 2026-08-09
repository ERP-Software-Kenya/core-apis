import { AutoMap } from '@automapper/classes';
import { ECreditTransactionType } from '../../../../infrastructure/persistence/entities/customer-credit-transaction.entity';

export class CustomerCreditTransaction {
  @AutoMap() public id: string;
  @AutoMap() public customerId: string;
  @AutoMap() public billId?: string;
  @AutoMap(() => String) public type: ECreditTransactionType;
  @AutoMap() public amount: number;
  @AutoMap() public balanceBefore: number;
  @AutoMap() public balanceAfter: number;
  @AutoMap() public performedById?: string;
  @AutoMap(() => Date) public createdAt: Date;
}
