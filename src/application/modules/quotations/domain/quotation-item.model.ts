import { AutoMap } from '@automapper/classes';

export class QuotationItem {
  @AutoMap() public id: string;
  @AutoMap() public quotationId: string;
  @AutoMap() public productId: string;
  @AutoMap() public variantId?: string;
  @AutoMap() public quantity: number;
  @AutoMap() public unitPriceInclusive: number;
  @AutoMap() public unitTaxable: number;
  @AutoMap() public taxRate: number;
  @AutoMap() public taxAmount: number;
  @AutoMap() public lineTotal: number;

  public product?: {
    id: string;
    name: string;
    sku?: string;
    barcode?: string;
    hsnCode?: string;
  };

  public variant?: {
    id: string;
    name: string;
    sku?: string;
    barcode?: string;
  };
}

export type QuotationItemFilter = Record<string, never>;
