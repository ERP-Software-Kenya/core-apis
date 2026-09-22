import { ApiProperty } from '@nestjs/swagger';
import { ProductBranchPriceResponse } from './product-branch-price.response';

export class ProductBranchPricesPagedResponse {
  @ApiProperty({ type: [ProductBranchPriceResponse] }) public items: ProductBranchPriceResponse[];
  @ApiProperty() public page: number;
  @ApiProperty() public perPage: number;
  @ApiProperty() public totalCount: number;
  @ApiProperty() public totalPages: number;
}
