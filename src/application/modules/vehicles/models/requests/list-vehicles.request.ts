import { ApiPropertyOptional } from '@nestjs/swagger';
import { AutoMap } from '@automapper/classes';
import { IsOptional, IsString, IsEnum } from 'class-validator';
import { EOrder, Filter } from 'src/common';
import { Vehicle } from '../../domain';

export class ListVehiclesRequest implements Filter<Vehicle, string> {
  @ApiPropertyOptional() @IsOptional() @IsString() @AutoMap() public vehicleNumber?: string;

  @ApiPropertyOptional() @IsOptional() @IsString({ each: true }) @AutoMap(() => Array) public $ids?: string[];

  @ApiPropertyOptional() @IsOptional() @IsString() @AutoMap() public $orderBy?: string;

  @ApiPropertyOptional({ enum: EOrder }) @IsOptional() @IsEnum(EOrder) @AutoMap(() => String) public $order?: EOrder;
}
