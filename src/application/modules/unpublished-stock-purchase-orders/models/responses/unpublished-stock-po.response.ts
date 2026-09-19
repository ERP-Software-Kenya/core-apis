import { AutoMap } from '@automapper/classes';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { EPurchaseOrderStatus } from 'src/application/shared/enums';

export class UnpublishedStockPOItemResponse {
  @ApiProperty() @AutoMap() public id: string;
  @ApiProperty() @AutoMap() public purchaseOrderId: string;
  @ApiProperty() @AutoMap() public productId: string;
  @ApiProperty() @AutoMap() public quantityOrdered: number;
  @ApiProperty() @AutoMap() public quantityReceived: number;
  @ApiProperty() @AutoMap() public quantityAllocated: number;
  @ApiProperty() @AutoMap() public unitCost: number;
  @ApiProperty() @AutoMap() public totalCost: number;
  @ApiPropertyOptional() @AutoMap(() => Date) public createdAt?: Date;
}

export class UnpublishedStockPOResponse {
  @ApiProperty() @AutoMap() public id: string;
  @ApiProperty() @AutoMap() public organizationId: string;
  @ApiProperty() @AutoMap() public supplierId: string;
  @ApiPropertyOptional() @AutoMap() public createdById?: string;
  @ApiPropertyOptional() @AutoMap() public branchId?: string;
  @ApiProperty() @AutoMap() public poNumber: string;
  @ApiProperty({ enum: EPurchaseOrderStatus }) @AutoMap(() => String) public status: EPurchaseOrderStatus;
  @ApiPropertyOptional() @AutoMap(() => Date) public expectedAt?: Date;
  @ApiPropertyOptional() @AutoMap(() => Date) public receivedAt?: Date;
  @ApiProperty() @AutoMap() public totalAmount: number;
  @ApiProperty() @AutoMap() public amountPaid: number;
  @ApiPropertyOptional() public paymentStatus?: string;
  @ApiPropertyOptional() @AutoMap() public notes?: string;
  @ApiPropertyOptional() @AutoMap(() => Date) public createdAt?: Date;
  @ApiPropertyOptional() @AutoMap(() => Date) public updatedAt?: Date;
  @ApiPropertyOptional({ type: [UnpublishedStockPOItemResponse] }) @AutoMap(() => [UnpublishedStockPOItemResponse]) public items?: UnpublishedStockPOItemResponse[];
}

export class UnpublishedStockPOsPagedResponse {
  @ApiProperty({ type: [UnpublishedStockPOResponse] }) public items: UnpublishedStockPOResponse[];
  @ApiProperty() public page: number;
  @ApiProperty() public perPage: number;
  @ApiProperty() public totalCount: number;
  @ApiProperty() public totalPages: number;
}
