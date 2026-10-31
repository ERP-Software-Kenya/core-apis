import { AutoMap } from '@automapper/classes';
import { CommandBase } from '../../../../../common';

export class PackedItem {
  @AutoMap() public orderItemId: string;
  @AutoMap() public packedQty: number;
}

export class PackOrderCommand extends CommandBase {
  @AutoMap() public orderId: string;
  @AutoMap() public packerUserId: string;
  @AutoMap() public organizationId: string;
  @AutoMap(() => [PackedItem]) public items: PackedItem[];
}
