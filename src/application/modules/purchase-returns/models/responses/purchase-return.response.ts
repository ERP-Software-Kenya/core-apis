import { AutoMap } from '@automapper/classes';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { EPurchaseReturnDispatchStatus, EPurchaseReturnItemSourceType, EPurchaseReturnStatus } from '../../../../../infrastructure/persistence/entities';

export class PurchaseReturnItemResponse {
  @ApiProperty() @AutoMap() public id: string;
  @ApiProperty() @AutoMap() public purchaseReturnId: string;
  @ApiProperty() @AutoMap() public purchaseItemId: string;
  @ApiProperty() @AutoMap() public productId: string;
  @ApiProperty() @AutoMap() public quantity: number;
  @ApiProperty() @AutoMap() public unitCost: number;
  @ApiProperty() @AutoMap() public lineTotal: number;
  @ApiProperty({ enum: EPurchaseReturnItemSourceType }) @AutoMap(() => String) public sourceType: EPurchaseReturnItemSourceType;
  @ApiPropertyOptional() @AutoMap() public locationId?: string;
  @ApiPropertyOptional() @AutoMap() public reason?: string;
}

export class PurchaseReturnResponse {
  @ApiProperty() @AutoMap() public id: string;
  @ApiProperty() @AutoMap() public returnNumber: string;
  @ApiProperty() @AutoMap() public organizationId: string;
  @ApiProperty() @AutoMap() public purchaseOrderId: string;
  @ApiProperty() @AutoMap() public supplierId: string;
  @ApiProperty({ enum: EPurchaseReturnStatus }) @AutoMap(() => String) public status: EPurchaseReturnStatus;
  @ApiProperty({ enum: EPurchaseReturnDispatchStatus }) @AutoMap(() => String) public dispatchStatus: EPurchaseReturnDispatchStatus;
  @ApiProperty() @AutoMap() public totalAmount: number;
  @ApiPropertyOptional() @AutoMap() public reason?: string;
  @ApiPropertyOptional() @AutoMap() public notes?: string;
  @ApiPropertyOptional() @AutoMap() public createdById?: string;
  @ApiPropertyOptional() @AutoMap() public finalizedById?: string;
  @ApiPropertyOptional() @AutoMap(() => Date) public finalizedAt?: Date;
  @ApiPropertyOptional({ type: [PurchaseReturnItemResponse] }) @AutoMap(() => [PurchaseReturnItemResponse]) public items?: PurchaseReturnItemResponse[];
}

export class PurchaseReturnsPagedResponse {
  @ApiProperty({ type: [PurchaseReturnResponse] }) public items: PurchaseReturnResponse[];
  @ApiProperty() public page: number;
  @ApiProperty() public perPage: number;
  @ApiProperty() public totalCount: number;
  @ApiProperty() public totalPages: number;
}
