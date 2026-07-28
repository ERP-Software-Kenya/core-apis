import { AutoMap } from '@automapper/classes';
import { CommandBase } from 'src/common';

export class PublishStockCommand extends CommandBase {
  @AutoMap() public organizationId: string;
  @AutoMap() public inventoryId: string;
  @AutoMap() public locationId: string;
  @AutoMap() public productId: string;
  @AutoMap() public quantity: number;
  @AutoMap() public performedById?: string;
  @AutoMap() public notes?: string;
}
