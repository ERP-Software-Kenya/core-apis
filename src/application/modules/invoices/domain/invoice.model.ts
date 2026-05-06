import { AutoMap } from '@automapper/classes';

export class Invoice {
  @AutoMap() public id: string;
  @AutoMap() public orderId: string;
  @AutoMap() public invoiceNumber: string;
  @AutoMap() public totalAmount: number;
  @AutoMap() public status: string;
  @AutoMap(() => Date) public createdAt?: Date;
  @AutoMap(() => Date) public updatedAt?: Date;
}
