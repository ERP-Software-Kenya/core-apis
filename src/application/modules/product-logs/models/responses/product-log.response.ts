import { AutoMap } from '@automapper/classes';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { EProductLogAction } from 'src/infrastructure/persistence/entities';

export class ProductLogResponse {
  @ApiProperty() @AutoMap() public id: string;
  @ApiProperty() @AutoMap() public organizationId: string;
  @ApiProperty() @AutoMap() public productId: string;
  @ApiPropertyOptional() @AutoMap() public inventoryId?: string;
  @ApiPropertyOptional() @AutoMap() public locationId?: string;
  @ApiPropertyOptional() @AutoMap() public performedById?: string;
  @ApiProperty({ enum: EProductLogAction }) @AutoMap(() => String) public action: EProductLogAction;
  @ApiPropertyOptional() @AutoMap() public changedFields?: Array<{ field: string; oldValue: unknown; newValue: unknown }>;
  @ApiPropertyOptional() @AutoMap() public metadata?: Record<string, unknown>;
  @ApiPropertyOptional() @AutoMap(() => Date) public createdAt?: Date;
}

export class ProductLogsPagedResponse {
  @ApiProperty({ type: [ProductLogResponse] }) public items: ProductLogResponse[];
  @ApiProperty() public page: number;
  @ApiProperty() public perPage: number;
  @ApiProperty() public totalCount: number;
  @ApiProperty() public totalPages: number;
}
