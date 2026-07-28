import { AutoMap } from '@automapper/classes';
import { CommandBase } from 'src/common';

export class CreateInventoryCommand extends CommandBase {
  @AutoMap() public organizationId: string;
  @AutoMap() public locationId: string;
  @AutoMap() public productId: string;
  @AutoMap() public reorderLevel?: number;
  @AutoMap() public maxStock?: number;
  @AutoMap() public binLocation?: string;
}
