import { AutoMap } from '@automapper/classes';

export class Bill {
  @AutoMap() public id: string;
  @AutoMap() public supplierId: string;
  @AutoMap() public storeId: string;
  @AutoMap() public totalAmount: number;
  @AutoMap() public status: string;
  @AutoMap(() => Date) public createdAt: Date;
  @AutoMap(() => Date) public updatedAt?: Date;
}
