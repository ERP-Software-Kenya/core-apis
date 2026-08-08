import { AutoMap } from '@automapper/classes';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { BillItemResponse } from './bill-item.response';

export class BillResponse {
  @ApiProperty() @AutoMap() public id: string;
  @ApiProperty() @AutoMap() public billNumber: string;
  @ApiProperty() @AutoMap() public organizationId: string;
  @ApiProperty() @AutoMap() public locationId: string;
  @ApiPropertyOptional() @AutoMap() public customerId?: string;
  @ApiProperty() @AutoMap() public createdById: string;
  @ApiPropertyOptional() @AutoMap() public walkInName?: string;
  @ApiPropertyOptional() @AutoMap() public walkInPhone?: string;
  @ApiPropertyOptional() @AutoMap() public walkInGstin?: string;
  @ApiProperty() @AutoMap() public status: string;
  @ApiPropertyOptional() @AutoMap() public paymentMethod?: string;
  @ApiProperty() @AutoMap() public subtotal: number;
  @ApiProperty() @AutoMap() public taxAmount: number;
  @ApiProperty() @AutoMap() public discountAmount: number;
  @ApiProperty() @AutoMap() public totalAmount: number;
  @ApiPropertyOptional() @AutoMap() public notes?: string;
  @ApiPropertyOptional() @AutoMap(() => Date) public billedAt?: Date;
  @ApiProperty() @AutoMap(() => Date) public createdAt: Date;
  @ApiPropertyOptional() @AutoMap(() => Date) public updatedAt?: Date;
  @ApiPropertyOptional({ type: [BillItemResponse] }) @AutoMap(() => [BillItemResponse]) public items?: BillItemResponse[];
}

export class BillsPagedResponse {
  @ApiProperty({ type: [BillResponse] }) public items: BillResponse[];
  @ApiProperty() public page: number;
  @ApiProperty() public perPage: number;
  @ApiProperty() public totalCount: number;
  @ApiProperty() public totalPages: number;
}
