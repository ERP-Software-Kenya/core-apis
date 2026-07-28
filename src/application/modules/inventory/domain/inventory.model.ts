import { AutoMap } from '@automapper/classes';

export class Inventory {
  @AutoMap() public id: string;
  @AutoMap() public organizationId: string;
  @AutoMap() public locationId: string;
  @AutoMap() public productId: string;
  @AutoMap() public quantityOnHand: number;
  @AutoMap() public quantityUnpublished: number;
  @AutoMap() public quantityReserved: number;
  @AutoMap() public reorderLevel: number;
  @AutoMap() public maxStock?: number;
  @AutoMap() public averageCost?: number;
  @AutoMap() public binLocation?: string;
  @AutoMap(() => Date) public createdAt?: Date;
  @AutoMap(() => Date) public updatedAt?: Date;
}
