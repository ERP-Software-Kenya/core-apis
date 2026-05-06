import { AutoMap } from '@automapper/classes';

export class StockTransfer {
  @AutoMap() public id: string;
  @AutoMap() public organizationId: string;
  @AutoMap() public fromStoreId: string;
  @AutoMap() public toStoreId: string;
  @AutoMap() public transferNumber: string;
  @AutoMap() public status: string;
  @AutoMap(() => Date) public createdAt?: Date;
  @AutoMap(() => Date) public updatedAt?: Date;
}
