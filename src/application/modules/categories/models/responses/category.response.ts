import { AutoMap } from '@automapper/classes';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CategoryResponse {
  @ApiProperty() @AutoMap() public id: string;
  @ApiPropertyOptional() @AutoMap() public organizationId?: string;
  @ApiPropertyOptional() @AutoMap() public parentId?: string;
  @ApiPropertyOptional() @AutoMap() public name?: string;
  @ApiPropertyOptional() @AutoMap() public description?: string;
  @ApiPropertyOptional() @AutoMap() public isActive?: boolean;
  @ApiPropertyOptional() @AutoMap(() => Date) public createdAt?: Date;
  @ApiPropertyOptional() @AutoMap(() => Date) public updatedAt?: Date;
}

export class CategorysPagedResponse {
  @ApiProperty({ type: [CategoryResponse] }) public items: CategoryResponse[];
  @ApiProperty() public page: number;
  @ApiProperty() public perPage: number;
  @ApiProperty() public totalCount: number;
  @ApiProperty() public totalPages: number;
}
