import { AutoMap } from '@automapper/classes';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString, IsUUID, Min } from 'class-validator';

export class CreateInventoryRequest {
  @ApiProperty() @IsString() @AutoMap() public locationId: string;
  @ApiProperty() @IsString() @AutoMap() public productId: string;
  @ApiPropertyOptional() @IsOptional() @IsUUID() @AutoMap() public unitId?: string;
  @ApiPropertyOptional() @IsOptional() @IsNumber() @Min(0) @AutoMap() public reorderLevel?: number;
  @ApiPropertyOptional() @IsOptional() @IsNumber() @Min(0) @AutoMap() public maxStock?: number;
  @ApiPropertyOptional() @IsOptional() @IsString() @AutoMap() public binLocation?: string;
}
