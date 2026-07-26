import { AutoMap } from '@automapper/classes';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class ProductResponse {
  @ApiProperty() @AutoMap() public id: string;
  @ApiPropertyOptional() @AutoMap() public name?: string;
  @ApiPropertyOptional() @AutoMap() public imageUrl?: string;
}

export class ProductsPagedResponse {
  @ApiProperty({ type: [ProductResponse] }) public items: ProductResponse[];
  @ApiProperty() public page: number;
  @ApiProperty() public perPage: number;
  @ApiProperty() public totalCount: number;
  @ApiProperty() public totalPages: number;
}
