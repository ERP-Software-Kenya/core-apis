import { AutoMap } from '@automapper/classes';
import { CommandBase } from '../../../../../common';

export class UpdateBillItemCommand extends CommandBase {
  @AutoMap() public billId: string;
  @AutoMap() public itemId: string;
  @AutoMap() public productId?: string;
  @AutoMap() public variantId?: string;
  @AutoMap() public quantity?: number;
  @AutoMap() public unitPrice?: number;
  @AutoMap() public taxRate?: number;
  @AutoMap() public discountAmount?: number;
}
