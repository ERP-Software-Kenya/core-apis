import { AutoMap } from '@automapper/classes';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsNumber, IsOptional } from 'class-validator';

export class UpdatePurchaseItemRequest {
  @ApiPropertyOptional() @IsOptional() @IsNumber() @AutoMap() public quantity?: number;
  @ApiPropertyOptional() @IsOptional() @IsNumber() @AutoMap() public unitPrice?: number;
}
