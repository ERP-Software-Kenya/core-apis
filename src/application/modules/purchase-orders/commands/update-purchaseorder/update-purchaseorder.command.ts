import { AutoMap } from '@automapper/classes';
import { CommandBase } from 'src/common';
import { EPurchaseOrderStatus } from 'src/application/shared/enums';

export class UpdatePurchaseOrderCommand extends CommandBase {
  @AutoMap() public id: string;
  @AutoMap(() => String) public status?: EPurchaseOrderStatus;
  @AutoMap() public expectedAt?: string;
  @AutoMap() public notes?: string;
}
