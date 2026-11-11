import { AutoMap } from '@automapper/classes';
import { CommandBase } from '../../../../../common';

export class AddBillItemCommand extends CommandBase {
  @AutoMap() public billId: string;
  @AutoMap() public organizationId: string;
  @AutoMap() public productId: string;
  @AutoMap() public productUnitId?: string;
  @AutoMap() public variantId?: string;
  @AutoMap() public quantity: number;
  @AutoMap() public unitPrice: number;
  @AutoMap() public taxRate?: number;
  @AutoMap() public discountAmount?: number;
  @AutoMap() public locationId?: string;
}
