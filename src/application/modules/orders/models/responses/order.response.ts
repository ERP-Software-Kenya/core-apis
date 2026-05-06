import { AutoMap } from '@automapper/classes';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class OrderResponse {
  @ApiProperty() @AutoMap() public id: string;
  @ApiProperty() @AutoMap() public orderNumber: string;
  @ApiProperty() @AutoMap() public storeId: string;
  @ApiProperty() @AutoMap() public customerId: string;
  @ApiPropertyOptional() @AutoMap() public status?: string;
  @ApiPropertyOptional() @AutoMap() public subtotal?: number;
  @ApiPropertyOptional() @AutoMap() public taxAmount?: number;
  @ApiPropertyOptional() @AutoMap() public totalAmount?: number;
  @ApiPropertyOptional() @AutoMap() public paymentStatus?: string;
}
