import { AutoMap } from '@automapper/classes';
import { CommandBase } from '../../../../../common';

export class CompleteTransferItemInput {
  @AutoMap() public fromInventoryId: string;
  @AutoMap() public toInventoryId?: string;
  @AutoMap() public productId: string;
  @AutoMap() public fromLocationId: string;
  @AutoMap() public toLocationId: string;
  @AutoMap() public quantity: number;
}

export class CompleteStockTransferCommand extends CommandBase {
  public transferId: string;
  public organizationId: string;
  public performedById?: string;
  public items: CompleteTransferItemInput[];
}
