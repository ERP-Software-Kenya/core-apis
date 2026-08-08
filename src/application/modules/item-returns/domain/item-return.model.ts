import { AutoMap } from '@automapper/classes';

export class ItemReturn {
  @AutoMap() public id: string;
  @AutoMap() public locationId: string;
  @AutoMap() public orderId?: string;
  @AutoMap() public supplierId?: string;
  @AutoMap() public returnType: string;
  @AutoMap() public status: string;
  @AutoMap() public totalAmount: number;
  @AutoMap(() => Date) public createdAt: Date;
}
