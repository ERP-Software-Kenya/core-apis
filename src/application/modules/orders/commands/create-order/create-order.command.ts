import { AutoMap } from '@automapper/classes';
import { CommandBase } from '../../../../../common';

export class CreateOrderCommand extends CommandBase {
  @AutoMap() public storeId: string;
  @AutoMap() public customerId: string;
  @AutoMap() public status?: string;
  @AutoMap() public subtotal?: number;
  @AutoMap() public taxAmount?: number;
  @AutoMap() public totalAmount?: number;
  @AutoMap() public paymentStatus?: string;
}
