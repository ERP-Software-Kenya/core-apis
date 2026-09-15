import { AutoMap } from '@automapper/classes';
import { EPurchaseReturnDispatchStatus, EPurchaseReturnStatus } from '../../../../infrastructure/persistence/entities';
import { PurchaseReturnItem } from './purchase-return-item.model';

export class PurchaseReturn {
  @AutoMap() public id: string;
  @AutoMap() public returnNumber: string;
  @AutoMap() public organizationId: string;
  @AutoMap() public purchaseOrderId: string;
  @AutoMap() public supplierId: string;
  @AutoMap(() => String) public status: EPurchaseReturnStatus;
  @AutoMap(() => String) public dispatchStatus: EPurchaseReturnDispatchStatus;
  @AutoMap() public totalAmount: number;
  @AutoMap() public reason?: string;
  @AutoMap() public notes?: string;
  @AutoMap() public createdById?: string;
  @AutoMap() public finalizedById?: string;
  @AutoMap(() => Date) public finalizedAt?: Date;
  @AutoMap(() => Date) public createdAt?: Date;
  @AutoMap(() => Date) public updatedAt?: Date;
  @AutoMap(() => [PurchaseReturnItem]) public items?: PurchaseReturnItem[];
}
