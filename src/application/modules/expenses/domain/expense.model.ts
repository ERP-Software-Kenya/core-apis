import { AutoMap } from '@automapper/classes';

export class Expense {
  @AutoMap() public id: string;
  @AutoMap() public organizationId: string;
  @AutoMap() public locationId?: string;
  @AutoMap() public category: string;
  @AutoMap() public amount: number;
  @AutoMap(() => Date) public expenseDate: Date;
  @AutoMap(() => Date) public createdAt: Date;
  @AutoMap(() => Date) public updatedAt?: Date;
}
