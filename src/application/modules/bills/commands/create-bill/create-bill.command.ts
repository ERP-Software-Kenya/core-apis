import { AutoMap } from '@automapper/classes';
import { CommandBase } from '../../../../../common';

export class CreateBillItemCommand {
  @AutoMap() public productId: string;
  @AutoMap() public variantId?: string;
  @AutoMap() public quantity: number;
  @AutoMap() public unitPrice: number;
  @AutoMap() public taxRate?: number;
  @AutoMap() public discountAmount?: number;
}

export class CreateBillCommand extends CommandBase {
  /** Set by the controller from the authenticated user, not the request body. */
  @AutoMap() public organizationId: string;
  @AutoMap() public createdById: string;

  @AutoMap() public locationId: string;
  @AutoMap() public customerId?: string;
  @AutoMap() public walkInName?: string;
  @AutoMap() public walkInPhone?: string;
  @AutoMap() public walkInGstin?: string;
  @AutoMap() public notes?: string;
  @AutoMap(() => [CreateBillItemCommand]) public items: CreateBillItemCommand[];
}
