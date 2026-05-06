import { AutoMap } from '@automapper/classes';

export class PaymentTransaction {
  @AutoMap() public id: string;
  @AutoMap() public orgId: string;
  @AutoMap() public referenceId: string;
  @AutoMap() public referenceType: string;
  @AutoMap() public type: string;
  @AutoMap() public method: string;
  @AutoMap() public amount: number;
  @AutoMap() public status: string;
  @AutoMap(() => Date) public createdAt: Date;
}
