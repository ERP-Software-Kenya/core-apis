import { AutoMap } from '@automapper/classes';
import { CommandBase } from '../../../../../common';

export class CreateStockTransferCommand extends CommandBase {
  @AutoMap() public organizationId: string;
  @AutoMap() public fromLocationId: string;
  @AutoMap() public toLocationId: string;
}
