import { AutoMap } from '@automapper/classes';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class SupplierResponse {
  @ApiProperty() @AutoMap() public id: string;
  @ApiPropertyOptional() @AutoMap() public organizationId?: string;
  @ApiPropertyOptional() @AutoMap() public name?: string;
  @ApiPropertyOptional() @AutoMap() public contactPerson?: string;
  @ApiPropertyOptional() @AutoMap() public email?: string;
  @ApiPropertyOptional() @AutoMap() public phone?: string;
  @ApiPropertyOptional() @AutoMap() public address?: string;
  @ApiPropertyOptional() @AutoMap() public taxId?: string;
  @ApiPropertyOptional() @AutoMap() public isActive?: boolean;
  @ApiPropertyOptional() @AutoMap(() => Date) public createdAt?: Date;
  @ApiPropertyOptional() @AutoMap(() => Date) public updatedAt?: Date;
}

export class SuppliersPagedResponse {
  @ApiProperty({ type: [SupplierResponse] }) public items: SupplierResponse[];
  @ApiProperty() public page: number;
  @ApiProperty() public perPage: number;
  @ApiProperty() public totalCount: number;
  @ApiProperty() public totalPages: number;
}
