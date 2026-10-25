import { AutoMap } from '@automapper/classes';
import { EPurchaseOrderStatus } from 'src/application/shared/enums';
import { UnpublishedStockPurchaseItem } from './unpublished-stock-purchase-item.model';

export class UnpublishedStockPurchaseOrder {
  @AutoMap() public id: string;
  @AutoMap() public organizationId: string;
  @AutoMap() public supplierId: string;
  @AutoMap() public createdById?: string;
  @AutoMap() public branchId?: string;
  @AutoMap() public poNumber: string;
  @AutoMap(() => String) public status: EPurchaseOrderStatus;
  @AutoMap(() => Date) public expectedAt?: Date;
  @AutoMap(() => Date) public receivedAt?: Date;
  @AutoMap() public totalAmount: number;
  @AutoMap() public amountPaid: number;
  @AutoMap() public notes?: string;
  @AutoMap(() => Date) public createdAt?: Date;
  @AutoMap(() => Date) public updatedAt?: Date;
  @AutoMap(() => [UnpublishedStockPurchaseItem]) public items?: UnpublishedStockPurchaseItem[];
}
