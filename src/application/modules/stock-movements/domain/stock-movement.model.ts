import { AutoMap } from '@automapper/classes';

export class StockMovement {
  @AutoMap() public id: string;
  @AutoMap() public organizationId: string;
  @AutoMap() public inventoryId: string;
  @AutoMap() public userId?: string;
  @AutoMap() public quantity: number;
  @AutoMap() public type: string;
  @AutoMap() public reason?: string;
  @AutoMap(() => Date) public createdAt?: Date;
}
