import { AutoMap } from '@automapper/classes';
import { QuotationItem } from './quotation-item.model';
import { EQuotationStatus } from '../../../shared/enums';

export class Quotation {
  @AutoMap() public id: string;
  @AutoMap() public quoteNumber: string;
  @AutoMap() public versionNumber: number;
  @AutoMap() public rootQuotationId: string;
  @AutoMap() public parentQuotationId?: string;
  @AutoMap() public isLatest: boolean;
  @AutoMap() public status: EQuotationStatus;
  @AutoMap() public organizationId: string;
  @AutoMap() public locationId: string;
  @AutoMap() public customerId: string;
  @AutoMap() public subtotal: number;
  @AutoMap() public taxAmount: number;
  @AutoMap() public totalAmount: number;
  @AutoMap() public notes?: string;
  @AutoMap() public convertedOrderId?: string;
  @AutoMap() public createdByUserId?: string;
  @AutoMap(() => Date) public createdAt: Date;
  @AutoMap(() => Date) public updatedAt?: Date;
  @AutoMap(() => Date) public deletedAt?: Date;
  @AutoMap(() => [QuotationItem]) public items?: QuotationItem[];

  public customer?: {
    id: string;
    name: string;
    phone?: string;
    email?: string;
    address?: string;
    gstin?: string;
  };

  public location?: {
    id: string;
    name: string;
    address?: string;
    phone?: string;
  };

  public createdByUser?: {
    id: string;
    firstName?: string;
    lastName?: string;
    email?: string;
  };
}
