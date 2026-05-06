import { AutoMap } from '@automapper/classes';
import { CommandBase } from '../../../../../common';

export class CreateItemReturnCommand extends CommandBase {
  @AutoMap() public storeId: string;
  @AutoMap() public orderId: string;
  @AutoMap() public supplierId: string;
  @AutoMap() public returnType: string;
  @AutoMap() public status?: string;
  @AutoMap() public totalAmount: number;
}
