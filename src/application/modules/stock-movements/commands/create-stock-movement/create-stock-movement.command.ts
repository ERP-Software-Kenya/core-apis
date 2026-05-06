import { AutoMap } from '@automapper/classes';
import { CommandBase } from '../../../../../common';

export class CreateStockMovementCommand extends CommandBase {
  @AutoMap() public organizationId: string;
  @AutoMap() public inventoryId: string;
  @AutoMap() public userId?: string;
  @AutoMap() public quantity: number;
  @AutoMap() public type: string;
  @AutoMap() public reason?: string;
}
