import { AutoMap } from '@automapper/classes';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class StockTransferResponse {
  @ApiProperty() @AutoMap() public id: string;
  @ApiProperty() @AutoMap() public organizationId: string;
  @ApiProperty() @AutoMap() public fromStoreId: string;
  @ApiProperty() @AutoMap() public toStoreId: string;
  @ApiProperty() @AutoMap() public transferNumber: string;
  @ApiPropertyOptional() @AutoMap() public status?: string;
}
