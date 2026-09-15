import { AutoMap } from '@automapper/classes';
import { ESaleType, ESalesReturnRefundStatus, ESalesReturnStatus } from '../../../../infrastructure/persistence/entities';
import { SalesReturnItem } from './sales-return-item.model';

export class SalesReturn {
  @AutoMap() public id: string;
  @AutoMap() public returnNumber: string;
  @AutoMap() public organizationId: string;
  @AutoMap() public locationId: string;
  @AutoMap() public billId: string;
  @AutoMap() public customerId?: string;
  @AutoMap(() => String) public saleType: ESaleType;
  @AutoMap(() => String) public status: ESalesReturnStatus;
  @AutoMap() public refundMethod?: string;
  @AutoMap(() => String) public refundStatus: ESalesReturnRefundStatus;
  @AutoMap() public subtotal: number;
  @AutoMap() public taxAmount: number;
  @AutoMap() public discountAmount: number;
  @AutoMap() public totalAmount: number;
  @AutoMap() public reason?: string;
  @AutoMap() public notes?: string;
  @AutoMap() public createdById?: string;
  @AutoMap() public finalizedById?: string;
  @AutoMap(() => Date) public finalizedAt?: Date;
  @AutoMap(() => Date) public createdAt?: Date;
  @AutoMap(() => Date) public updatedAt?: Date;
  @AutoMap(() => [SalesReturnItem]) public items?: SalesReturnItem[];
}
