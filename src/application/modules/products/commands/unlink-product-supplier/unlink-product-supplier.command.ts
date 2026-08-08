import { AutoMap } from '@automapper/classes';
import { CommandBase } from 'src/common';

export class UnlinkProductSupplierCommand extends CommandBase {
  @AutoMap() public productId: string;
  @AutoMap() public supplierId: string;
}
