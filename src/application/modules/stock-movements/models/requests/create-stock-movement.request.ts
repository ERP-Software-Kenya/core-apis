import { AutoMap } from '@automapper/classes';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString, IsUUID } from 'class-validator';

export class CreateStockMovementRequest {
  @ApiProperty() @IsNotEmpty() @IsUUID() @AutoMap() public organizationId: string;
  @ApiProperty() @IsNotEmpty() @IsUUID() @AutoMap() public inventoryId: string;
  @ApiPropertyOptional() @IsOptional() @IsUUID() @AutoMap() public userId?: string;
  @ApiProperty() @IsNotEmpty() @IsNumber() @AutoMap() public quantity: number;
  @ApiProperty() @IsNotEmpty() @IsEnum(['IN', 'OUT']) @AutoMap() public type: string;
  @ApiPropertyOptional() @IsOptional() @IsString() @AutoMap() public reason?: string;
}
