import { AutoMap } from '@automapper/classes';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class ProductBranchPriceResponse {
  @ApiProperty() @AutoMap() public id: string;
  @ApiProperty() @AutoMap() public organizationId: string;
  @ApiProperty() @AutoMap() public branchId: string;
  @ApiProperty() @AutoMap() public productId: string;
  @ApiProperty() @AutoMap() public productName: string;
  @ApiPropertyOptional() @AutoMap() public sku?: string;
  @ApiPropertyOptional({ nullable: true, type: Number }) @AutoMap() public costPrice: number | null;
  @ApiPropertyOptional({ nullable: true, type: Number }) @AutoMap() public retailPrice: number | null;
  @ApiPropertyOptional({ nullable: true, type: Number }) @AutoMap() public loyaltyPrice: number | null;
  @ApiPropertyOptional({ nullable: true, type: Number }) @AutoMap() public wholesalePrice: number | null;
  @ApiPropertyOptional({ nullable: true, type: Number }) @AutoMap() public transferPrice: number | null;
  @ApiPropertyOptional() @AutoMap(() => Date) public createdAt?: Date;
  @ApiPropertyOptional() @AutoMap(() => Date) public updatedAt?: Date;
}
