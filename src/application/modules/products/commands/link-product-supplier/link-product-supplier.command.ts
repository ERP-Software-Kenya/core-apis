import { AutoMap } from '@automapper/classes';
import { CommandBase } from 'src/common';

export class LinkProductSupplierCommand extends CommandBase {
  @AutoMap() public productId: string;
  @AutoMap() public supplierId: string;
  @AutoMap() public isDefault?: boolean;
  @AutoMap() public unitCost?: number;
  @AutoMap() public leadTimeDays?: number;
  @AutoMap() public minOrderQty?: number;
}
