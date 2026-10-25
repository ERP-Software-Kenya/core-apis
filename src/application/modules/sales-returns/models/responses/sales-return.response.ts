import { AutoMap } from '@automapper/classes';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { ESaleType, ESalesReturnItemCondition, ESalesReturnRefundStatus, ESalesReturnStatus } from '../../../../../infrastructure/persistence/entities';

export class SalesReturnItemResponse {
  @ApiProperty() @AutoMap() public id: string;
  @ApiProperty() @AutoMap() public salesReturnId: string;
  @ApiProperty() @AutoMap() public billItemId: string;
  @ApiProperty() @AutoMap() public productId: string;
  @ApiPropertyOptional() @AutoMap() public variantId?: string;
  @ApiProperty() @AutoMap() public quantity: number;
  @ApiProperty() @AutoMap() public unitPrice: number;
  @ApiProperty() @AutoMap() public taxRate: number;
  @ApiProperty() @AutoMap() public taxAmount: number;
  @ApiProperty() @AutoMap() public discountAmount: number;
  @ApiProperty() @AutoMap() public lineTotal: number;
  @ApiProperty({ enum: ESalesReturnItemCondition }) @AutoMap(() => String) public condition: ESalesReturnItemCondition;
  @ApiPropertyOptional() @AutoMap() public reason?: string;
}

export class SalesReturnResponse {
  @ApiProperty() @AutoMap() public id: string;
  @ApiProperty() @AutoMap() public returnNumber: string;
  @ApiProperty() @AutoMap() public organizationId: string;
  @ApiProperty() @AutoMap() public locationId: string;
  @ApiProperty() @AutoMap() public billId: string;
  @ApiPropertyOptional() @AutoMap() public customerId?: string;
  @ApiProperty({ enum: ESaleType }) @AutoMap(() => String) public saleType: ESaleType;
  @ApiProperty({ enum: ESalesReturnStatus }) @AutoMap(() => String) public status: ESalesReturnStatus;
  @ApiPropertyOptional() @AutoMap() public refundMethod?: string;
  @ApiProperty({ enum: ESalesReturnRefundStatus }) @AutoMap(() => String) public refundStatus: ESalesReturnRefundStatus;
  @ApiProperty() @AutoMap() public subtotal: number;
  @ApiProperty() @AutoMap() public taxAmount: number;
  @ApiProperty() @AutoMap() public discountAmount: number;
  @ApiProperty() @AutoMap() public totalAmount: number;
  @ApiPropertyOptional() @AutoMap() public reason?: string;
  @ApiPropertyOptional() @AutoMap() public notes?: string;
  @ApiPropertyOptional() @AutoMap() public createdById?: string;
  @ApiPropertyOptional() @AutoMap() public finalizedById?: string;
  @ApiPropertyOptional() @AutoMap(() => Date) public finalizedAt?: Date;
  @ApiPropertyOptional({ type: [SalesReturnItemResponse] }) @AutoMap(() => [SalesReturnItemResponse]) public items?: SalesReturnItemResponse[];
}

export class SalesReturnsPagedResponse {
  @ApiProperty({ type: [SalesReturnResponse] }) public items: SalesReturnResponse[];
  @ApiProperty() public page: number;
  @ApiProperty() public perPage: number;
  @ApiProperty() public totalCount: number;
  @ApiProperty() public totalPages: number;
}
