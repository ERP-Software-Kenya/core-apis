import { AutoMap } from '@automapper/classes';
import { CommandBase } from '../../../../../common';

export class CreateStockTransferCommand extends CommandBase {
  @AutoMap() public organizationId: string;
  @AutoMap() public fromStoreId: string;
  @AutoMap() public toStoreId: string;
  @AutoMap() public status?: string;
}
