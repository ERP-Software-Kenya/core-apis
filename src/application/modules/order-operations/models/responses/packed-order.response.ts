import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class PackedOrderResponse {
  @ApiProperty() public id: string;
  @ApiProperty() public orderNumber: string;
  @ApiProperty() public customerId: string;
  @ApiProperty() public customerName: string;
  @ApiProperty() public deliveryAddress: string;
  @ApiProperty() public pickerName: string;
  @ApiProperty() public packedAt: Date;
  @ApiProperty() public itemCount: number;
  @ApiProperty() public locationId: string;
  @ApiProperty() public organizationId: string;
  @ApiPropertyOptional() public paymentLabel?: string;
  @ApiPropertyOptional() public canDispatch?: boolean;
  @ApiPropertyOptional() public blockReason?: string;
  @ApiPropertyOptional() public amountPaid?: number;
  @ApiPropertyOptional() public amountRequired?: number;
  @ApiPropertyOptional() public creditApprovalPending?: boolean;
}
