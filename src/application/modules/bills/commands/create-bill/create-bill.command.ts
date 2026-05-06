import { AutoMap } from '@automapper/classes';
import { CommandBase } from '../../../../../common';

export class CreateBillCommand extends CommandBase {
  @AutoMap() public supplierId: string;
  @AutoMap() public storeId: string;
  @AutoMap() public totalAmount: number;
  @AutoMap() public status: string;
}
