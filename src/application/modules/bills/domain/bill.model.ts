import { AutoMap } from '@automapper/classes';
import { EBillStatus, EPaymentMethod } from '../../../../infrastructure/persistence/entities';
import { BillItem } from './bill-item.model';

export class Bill {
  @AutoMap() public id: string;
  @AutoMap() public billNumber: string;
  @AutoMap() public organizationId: string;
  @AutoMap() public locationId: string;
  @AutoMap() public customerId?: string;
  @AutoMap() public createdById?: string;
  @AutoMap() public walkInName?: string;
  @AutoMap() public walkInPhone?: string;
  @AutoMap() public walkInGstin?: string;
  @AutoMap(() => String) public status: EBillStatus;
  @AutoMap(() => String) public paymentMethod?: EPaymentMethod;
  @AutoMap() public subtotal: number;
  @AutoMap() public taxAmount: number;
  @AutoMap() public discountAmount: number;
  @AutoMap() public totalAmount: number;
  @AutoMap() public notes?: string;
  @AutoMap(() => Date) public billedAt?: Date;
  @AutoMap(() => Date) public createdAt: Date;
  @AutoMap(() => Date) public updatedAt?: Date;
  @AutoMap(() => [BillItem]) public items?: BillItem[];
}
