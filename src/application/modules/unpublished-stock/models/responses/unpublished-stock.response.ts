import { AutoMap } from '@automapper/classes';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class UnpublishedStockResponse {
  @ApiProperty() @AutoMap() public id: string;
  @ApiProperty() @AutoMap() public organizationId: string;
  @ApiProperty() @AutoMap() public locationId: string;
  @ApiProperty() @AutoMap() public productId: string;
  @ApiProperty() @AutoMap() public quantityOnHand: number;
  @ApiPropertyOptional() @AutoMap() public averageCost?: number;
  @ApiPropertyOptional() @AutoMap() public binLocation?: string;
  @ApiPropertyOptional() @AutoMap(() => Date) public createdAt?: Date;
  @ApiPropertyOptional() @AutoMap(() => Date) public updatedAt?: Date;
}

export class UnpublishedStocksPagedResponse {
  @ApiProperty({ type: [UnpublishedStockResponse] }) public items: UnpublishedStockResponse[];
  @ApiProperty() public page: number;
  @ApiProperty() public perPage: number;
  @ApiProperty() public totalCount: number;
  @ApiProperty() public totalPages: number;
}
