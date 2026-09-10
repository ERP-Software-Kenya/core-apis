import { AutoMap } from '@automapper/classes';
import { CommandBase } from '../../../../../common';
import { EFulfillmentMode } from '../../../../shared/enums/e-fulfillment-mode';
import { EPaymentTiming, ESaleType } from '../../../../../infrastructure/persistence/entities';
import { ECustomerType } from '../../../../../infrastructure/persistence/entities/e-customer-type';

export class CreateOrderItemInput {
  public productId: string;
  public quantity: number;
  public unitPrice: number;
  public taxAmount?: number;
  public packQuantity?: number;
  public packSizeSnapshot?: number;
}

export class CreateOrderCommand extends CommandBase {
  @AutoMap() public locationId: string;
  @AutoMap() public customerId: string;
  @AutoMap() public fulfillmentLocationId?: string;
  @AutoMap() public fulfillmentMode?: EFulfillmentMode;
  @AutoMap() public status?: string;
  @AutoMap() public subtotal?: number;
  @AutoMap() public taxAmount?: number;
  @AutoMap() public totalAmount?: number;
  @AutoMap() public paymentStatus?: string;
  @AutoMap(() => String) public paymentTiming?: EPaymentTiming;
  @AutoMap() public partialAmount?: number;
  @AutoMap(() => String) public saleType?: ESaleType;
  @AutoMap(() => String) public customerType?: ECustomerType;
  public performedById?: string;
  public items: CreateOrderItemInput[];
}
