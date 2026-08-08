import { AutoMap } from '@automapper/classes';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString, Min } from 'class-validator';

export class CreateInventoryRequest {
  @ApiProperty() @IsNotEmpty() @IsString() @AutoMap() public locationId: string;
  @ApiProperty() @IsNotEmpty() @IsString() @AutoMap() public productId: string;
  @ApiPropertyOptional() @IsOptional() @IsNumber() @Min(0) @AutoMap() public reorderLevel?: number;
  @ApiPropertyOptional() @IsOptional() @IsNumber() @Min(0) @AutoMap() public maxStock?: number;
  @ApiPropertyOptional() @IsOptional() @IsString() @AutoMap() public binLocation?: string;
}
