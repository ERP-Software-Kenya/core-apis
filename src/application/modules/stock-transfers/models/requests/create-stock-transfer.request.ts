import { AutoMap } from '@automapper/classes';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';

export class CreateStockTransferRequest {
  @ApiProperty() @IsNotEmpty() @IsUUID() @AutoMap() public organizationId: string;
  @ApiProperty() @IsNotEmpty() @IsUUID() @AutoMap() public fromStoreId: string;
  @ApiProperty() @IsNotEmpty() @IsUUID() @AutoMap() public toStoreId: string;
  @ApiPropertyOptional() @IsOptional() @IsString() @AutoMap() public status?: string;
}
