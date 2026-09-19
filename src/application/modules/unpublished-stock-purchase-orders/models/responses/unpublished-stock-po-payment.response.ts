import { AutoMap } from '@automapper/classes';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class UnpublishedStockPOPaymentResponse {
  @ApiProperty() @AutoMap() public id: string;
  @ApiProperty() @AutoMap() public organizationId: string;
  @ApiProperty() @AutoMap() public purchaseOrderId: string;
  @ApiProperty() @AutoMap() public supplierId: string;
  @ApiProperty() @AutoMap() public amount: number;
  @ApiProperty() @AutoMap() public paymentMethod: string;
  @ApiProperty() @AutoMap(() => Date) public paidAt: Date;
  @ApiPropertyOptional() @AutoMap() public note?: string;
  @ApiPropertyOptional() @AutoMap() public performedById?: string;
  @ApiProperty() @AutoMap(() => Date) public createdAt: Date;
}
