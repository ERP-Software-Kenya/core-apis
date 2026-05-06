import { AutoMap } from '@automapper/classes';
import { ApiProperty } from '@nestjs/swagger';

export class BillResponse {
  @AutoMap() @ApiProperty() public id: string;
  @AutoMap() @ApiProperty() public orgId: string;
  @AutoMap() @ApiProperty() public billNumber: string;
  @AutoMap() @ApiProperty() public amount: number;
  @AutoMap() @ApiProperty() public status: string;
  @AutoMap() @ApiProperty() public createdAt: Date;
}

export class BillsPagedResponse {
  @ApiProperty({ type: [BillResponse] }) public items: BillResponse[];
  @ApiProperty() public page: number;
  @ApiProperty() public perPage: number;
  @ApiProperty() public totalCount: number;
  @ApiProperty() public totalPages: number;
}
