import { AutoMap } from '@automapper/classes';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class SupplierResponse {
  @ApiProperty() @AutoMap() public id: string;
  @ApiPropertyOptional() @AutoMap() public name?: string;
}

export class SuppliersPagedResponse {
  @ApiProperty({ type: [SupplierResponse] }) public items: SupplierResponse[];
  @ApiProperty() public page: number;
  @ApiProperty() public perPage: number;
  @ApiProperty() public totalCount: number;
  @ApiProperty() public totalPages: number;
}
