import { AutoMap } from '@automapper/classes';
import { ESalesReturnItemCondition } from '../../../../../infrastructure/persistence/entities';

export class CreateSalesReturnItemCommand {
  @AutoMap() public billItemId: string;
  @AutoMap() public quantity: number;
  @AutoMap(() => String) public condition: ESalesReturnItemCondition;
  @AutoMap() public reason?: string;
}

export class CreateSalesReturnCommand {
  @AutoMap() public billId: string;
  @AutoMap() public reason?: string;
  @AutoMap() public notes?: string;
  @AutoMap() public refundMethod?: string;
  @AutoMap(() => [CreateSalesReturnItemCommand]) public items: CreateSalesReturnItemCommand[];
  public organizationId: string;
  public createdById?: string;
}
