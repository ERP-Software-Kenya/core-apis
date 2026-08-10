import { AutoMap } from '@automapper/classes';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  EBillStatus,
  ECustomerType,
  EPaymentMethod,
  EPaymentTiming,
  ESaleType,
} from '../../../../../infrastructure/persistence/entities';
import { CustomerResponse } from '../../../customers/models';
import { BillItemResponse } from './bill-item.response';

export class BillResponse {
  @ApiProperty() @AutoMap() public id: string;
  @ApiProperty() @AutoMap() public billNumber: string;
  @ApiProperty() @AutoMap() public organizationId: string;
  @ApiProperty() @AutoMap() public locationId: string;
  @ApiPropertyOptional({ nullable: true }) @AutoMap() public customerId?: string;
  @ApiPropertyOptional({ type: () => CustomerResponse, nullable: true }) @AutoMap(() => CustomerResponse) public customer?: CustomerResponse;
  @ApiProperty() @AutoMap() public createdById?: string;
  @ApiPropertyOptional({ nullable: true }) @AutoMap() public walkInName?: string;
  @ApiPropertyOptional({ nullable: true }) @AutoMap() public walkInPhone?: string;
  @ApiPropertyOptional({ nullable: true }) @AutoMap() public walkInGstin?: string;
  @ApiProperty({ enum: EBillStatus }) @AutoMap(() => String) public status: EBillStatus;
  @ApiPropertyOptional({ enum: EPaymentMethod, nullable: true }) @AutoMap(() => String) public paymentMethod?: EPaymentMethod;
  @ApiProperty({ enum: ESaleType }) @AutoMap(() => String) public saleType: ESaleType;
  @ApiPropertyOptional({ enum: ECustomerType }) @AutoMap(() => String) public customerType?: ECustomerType;
  @ApiPropertyOptional({ enum: EPaymentTiming }) @AutoMap(() => String) public paymentTiming?: EPaymentTiming;
  @ApiPropertyOptional() @AutoMap() public partialAmount?: number;
  @ApiProperty() @AutoMap() public blackAmount: number;
  @ApiPropertyOptional() @AutoMap() public facilitatorUserId?: string;
  @ApiPropertyOptional() @AutoMap() public facilitatorName?: string;
  @ApiProperty() @AutoMap() public commissionAmount: number;
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
