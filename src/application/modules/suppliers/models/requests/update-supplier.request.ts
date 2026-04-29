import { AutoMap } from '@automapper/classes';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class UpdateSupplierRequest {
  @ApiPropertyOptional() @IsOptional() @IsString() @AutoMap() public name?: string;
}
