import { AutoMap } from '@automapper/classes';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class BranchResponse {
  @ApiProperty() @AutoMap() public id: string;
  @ApiProperty() @AutoMap() public organizationId: string;
  @ApiProperty() @AutoMap() public name: string;
  @ApiPropertyOptional() @AutoMap() public code?: string;
  @ApiPropertyOptional() @AutoMap() public address?: string;
  @ApiPropertyOptional() @AutoMap() public city?: string;
  @ApiPropertyOptional() @AutoMap() public state?: string;
  @ApiPropertyOptional() @AutoMap() public country?: string;
  @ApiPropertyOptional() @AutoMap() public phone?: string;
  @ApiPropertyOptional() @AutoMap() public userId?: string;
  @ApiProperty() @AutoMap() public isActive: boolean;
  @ApiPropertyOptional({ type: [String] }) @AutoMap(() => [String]) public locationIds?: string[];
  @ApiPropertyOptional() @AutoMap() public createdAt?: Date;
  @ApiPropertyOptional() @AutoMap() public updatedAt?: Date;
}

export class BranchesPagedResponse {
  @ApiProperty({ type: [BranchResponse] }) public items: BranchResponse[];
  @ApiProperty() public page: number;
  @ApiProperty() public perPage: number;
  @ApiProperty() public totalCount: number;
  @ApiProperty() public totalPages: number;
}
