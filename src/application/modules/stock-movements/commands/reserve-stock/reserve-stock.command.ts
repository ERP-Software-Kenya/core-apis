import { AutoMap } from '@automapper/classes';
import { CommandBase } from 'src/common';

export class ReserveStockCommand extends CommandBase {
  @AutoMap() public organizationId: string;
  @AutoMap() public inventoryId: string;
  @AutoMap() public locationId: string;
  @AutoMap() public productId: string;
  @AutoMap() public quantity: number;
  @AutoMap() public referenceId?: string;
  @AutoMap() public referenceType?: string;
  @AutoMap() public performedById?: string;
  @AutoMap() public notes?: string;
}
