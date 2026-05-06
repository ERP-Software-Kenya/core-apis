import { AutoMap } from '@automapper/classes';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class InvoiceResponse {
  @ApiProperty() @AutoMap() public id: string;
  @ApiProperty() @AutoMap() public orderId: string;
  @ApiProperty() @AutoMap() public invoiceNumber: string;
  @ApiPropertyOptional() @AutoMap() public totalAmount?: number;
  @ApiPropertyOptional() @AutoMap() public status?: string;
}
