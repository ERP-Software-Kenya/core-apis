import { AutoMap } from '@automapper/classes';
import { CommandBase } from 'src/common';

export class UpdateInventoryCommand extends CommandBase {
  @AutoMap() public id: string;
  @AutoMap() public reorderLevel?: number;
  @AutoMap() public maxStock?: number;
  @AutoMap() public binLocation?: string;
}
