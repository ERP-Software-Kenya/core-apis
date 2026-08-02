import { AutoMap } from '@automapper/classes';
import { ApiProperty } from '@nestjs/swagger';

export class ItemReturnResponse {
  @AutoMap() @ApiProperty() public id: string;
  @AutoMap() @ApiProperty() public locationId: string;
  @AutoMap() @ApiProperty() public orderId?: string;
  @AutoMap() @ApiProperty() public supplierId?: string;
  @AutoMap() @ApiProperty() public returnType: string;
  @AutoMap() @ApiProperty() public status: string;
  @AutoMap() @ApiProperty() public totalAmount: number;
  @AutoMap() @ApiProperty() public createdAt: Date;
}

export class ItemReturnsPagedResponse {
  @ApiProperty({ type: [ItemReturnResponse] }) public items: ItemReturnResponse[];
  @ApiProperty() public page: number;
  @ApiProperty() public perPage: number;
  @ApiProperty() public totalCount: number;
  @ApiProperty() public totalPages: number;
}
