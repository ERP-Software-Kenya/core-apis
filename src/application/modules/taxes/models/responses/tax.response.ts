import { AutoMap } from '@automapper/classes';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class TaxResponse {
  @ApiProperty() @AutoMap() public id: string;
  @ApiPropertyOptional() @AutoMap() public organizationId?: string;
  @ApiProperty() @AutoMap() public name: string;
  @ApiProperty() @AutoMap() public rate: number;
  @ApiPropertyOptional() @AutoMap() public description?: string;
  @ApiProperty() @AutoMap() public isActive: boolean;
  @ApiProperty() @AutoMap(() => Date) public createdAt: Date;
  @ApiPropertyOptional() @AutoMap(() => Date) public updatedAt?: Date;
}

export class TaxesPagedResponse {
  @ApiProperty({ type: [TaxResponse] }) public items: TaxResponse[];
  @ApiProperty() public page: number;
  @ApiProperty() public perPage: number;
  @ApiProperty() public totalCount: number;
  @ApiProperty() public totalPages: number;
}
