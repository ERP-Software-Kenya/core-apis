import { AutoMap } from '@automapper/classes';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { EBillStatus, EPaymentMethod } from '../../../../../infrastructure/persistence/entities';

export class BillItemResponse {
  @ApiProperty() @AutoMap() public id: string;
  @ApiProperty() @AutoMap() public billId: string;
  @ApiProperty() @AutoMap() public productId: string;
  @ApiPropertyOptional({ nullable: true }) @AutoMap() public variantId?: string;
  @ApiProperty() @AutoMap() public quantity: number;
  @ApiProperty() @AutoMap() public unitPrice: number;
  @ApiProperty() @AutoMap() public taxRate: number;
  @ApiProperty() @AutoMap() public taxAmount: number;
  @ApiProperty() @AutoMap() public discountAmount: number;
  @ApiProperty() @AutoMap() public lineTotal: number;
}

export class BillResponse {
  @ApiProperty() @AutoMap() public id: string;
  @ApiProperty() @AutoMap() public billNumber: string;
  @ApiProperty() @AutoMap() public organizationId: string;
  @ApiProperty() @AutoMap() public locationId: string;
  @ApiPropertyOptional({ nullable: true }) @AutoMap() public customerId?: string;
  @ApiProperty() @AutoMap() public createdById?: string;
  @ApiPropertyOptional({ nullable: true }) @AutoMap() public walkInName?: string;
  @ApiPropertyOptional({ nullable: true }) @AutoMap() public walkInPhone?: string;
  @ApiPropertyOptional({ nullable: true }) @AutoMap() public walkInGstin?: string;
  @ApiProperty({ enum: EBillStatus }) @AutoMap(() => String) public status: EBillStatus;
  @ApiPropertyOptional({ enum: EPaymentMethod, nullable: true }) @AutoMap(() => String) public paymentMethod?: EPaymentMethod;
  @ApiProperty() @AutoMap() public subtotal: number;
  @ApiProperty() @AutoMap() public taxAmount: number;
  @ApiProperty() @AutoMap() public discountAmount: number;
  @ApiProperty() @AutoMap() public totalAmount: number;
  @ApiPropertyOptional({ nullable: true }) @AutoMap() public notes?: string;
  @ApiPropertyOptional({ nullable: true }) @AutoMap(() => Date) public billedAt?: Date;
  @ApiProperty() @AutoMap(() => Date) public createdAt: Date;
  @ApiPropertyOptional({ nullable: true }) @AutoMap(() => Date) public updatedAt?: Date;
  @ApiPropertyOptional({ type: [BillItemResponse] }) @AutoMap(() => [BillItemResponse]) public items?: BillItemResponse[];
}

export class BillsPagedResponse {
  @ApiProperty({ type: [BillResponse] }) public items: BillResponse[];
  @ApiProperty() public page: number;
  @ApiProperty() public perPage: number;
  @ApiProperty() public totalCount: number;
  @ApiProperty() public totalPages: number;
}
