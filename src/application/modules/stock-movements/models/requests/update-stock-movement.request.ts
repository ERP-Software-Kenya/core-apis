import { AutoMap } from '@automapper/classes';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class UpdateStockMovementRequest {
  @ApiPropertyOptional() @IsOptional() @IsString() @AutoMap() public reason?: string;
}
