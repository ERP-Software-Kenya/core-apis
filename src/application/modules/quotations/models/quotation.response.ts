import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { EQuotationStatus } from '../../../shared/enums';

export class QuotationItemResponse {
  @ApiProperty() public id: string;
  @ApiProperty() public quotationId: string;
  @ApiProperty() public productId: string;
  @ApiPropertyOptional() public variantId?: string;
  @ApiProperty() public quantity: number;
  @ApiProperty() public unitPriceInclusive: number;
  @ApiProperty() public unitTaxable: number;
  @ApiProperty() public taxRate: number;
  @ApiProperty() public taxAmount: number;
  @ApiProperty() public lineTotal: number;

  @ApiPropertyOptional()
  public product?: {
    id: string;
    name: string;
    sku?: string;
    barcode?: string;
    hsnCode?: string;
  };

  @ApiPropertyOptional()
  public variant?: {
    id: string;
    name: string;
    sku?: string;
    barcode?: string;
  };
}

export class QuotationResponse {
  @ApiProperty() public id: string;
  @ApiProperty() public quoteNumber: string;
  @ApiProperty() public versionNumber: number;
  @ApiProperty() public rootQuotationId: string;
  @ApiPropertyOptional() public parentQuotationId?: string;
  @ApiProperty() public isLatest: boolean;
  @ApiProperty({ enum: EQuotationStatus }) public status: EQuotationStatus;
  @ApiProperty() public organizationId: string;
  @ApiProperty() public locationId: string;
  @ApiProperty() public customerId: string;
  @ApiProperty() public subtotal: number;
  @ApiProperty() public taxAmount: number;
  @ApiProperty() public totalAmount: number;
  @ApiPropertyOptional() public notes?: string;
  @ApiPropertyOptional() public convertedOrderId?: string;
  @ApiPropertyOptional() public createdByUserId?: string;
  @ApiProperty() public createdAt: Date;
  @ApiPropertyOptional() public updatedAt?: Date;

  @ApiPropertyOptional({ type: [QuotationItemResponse] })
  public items?: QuotationItemResponse[];

  @ApiPropertyOptional()
  public customer?: {
    id: string;
    name: string;
    phone?: string;
    email?: string;
    address?: string;
    gstin?: string;
  };

  @ApiPropertyOptional()
  public location?: {
    id: string;
    name: string;
    address?: string;
    phone?: string;
  };

  @ApiPropertyOptional()
  public createdByUser?: {
    id: string;
    firstName?: string;
    lastName?: string;
    email?: string;
  };
}
